import { useParams, useSearchParams } from "react-router-dom";
import { useEffect, useReducer, useState } from "react";
import ErrorMessage from "../components/Error/ErrorMessage";
import BackButton from "../components/Buttons/BackButton";
import styles from "./PageStyles/SingleRecipePage.module.css";
import ShoppingListTable from "../components/ShoppingListTable.js/ShoppingListTable";

function shoppingListReducer(state, action) {
    switch (action.type) {
        case "setRecipes":
            return {...state, recipes: action.payload}
        case "setItems":
            return {...state, items: action.payload};
        default:
            break;
    }
}

function SingleShoppingListPage() {
    const { listId } = useParams();
    const [listParams, setListParams] = useSearchParams();
    const listName = listParams.get("name");

    const [listItems, dataDispatch] = useReducer(shoppingListReducer, { recipes: [], items: [] });
    const [hasError, setHasError] = useState(false);
    const error = "No List Items";

    useEffect(() => {
        let hasNoRecipes = false; let hasNoItems = false;

        async function getRecipes() {
            try {
                const response = await fetch(`http://localhost:8080/api/shopping-lists/${listId}/recipes`);

                if (!response.ok) {
                    const errorMessage = await response.json();
                    throw new Error(errorMessage.message);
                }

                const data = await response.json();

                dataDispatch({ type: "setRecipes", payload: data });
            } catch(err) {
                hasNoRecipes = true;
            }
        }
        getRecipes();

        async function getItems() {
            try {
                const response = await fetch(`http://localhost:8080/api/shopping-lists/${listId}/items/multiple`);
                
                if (!response.ok) {
                    const errorMessage = await response.json();
                    throw new Error(errorMessage.message);
                }
                
                const data = await response.json();

                dataDispatch({ type: "setItems", payload: data })
            } catch(err) {
                hasNoItems = true;
            }
        }
        getItems();
        if (hasNoRecipes && hasNoItems) {
            setHasError(true);
        }
    }, [listId]);
    
    
    return (
        <div>
            <BackButton />
            {!hasError && <ShoppingListTable listName={listName} />}
            {hasError && <ErrorMessage message={error}/>}
        </div>
    );
}

export default SingleShoppingListPage;