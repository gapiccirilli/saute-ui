import RecipeRow from "./RecipeRow";
import { useEffect, useReducer, useState } from "react";
import styles from "./ShoppingListTable.module.css";

function shoppingListReducer(state, action) {

    switch (action.type) {
        case "setRecipes":
            return {...state, recipes: action.payload};
        case "setItems":
            return {...state, items: action.payload};
        default:
            break;
    }
}

function ShoppingListTable({ listId, listName }) {
    const [listItems, dispatch] = useReducer(shoppingListReducer, { recipes: [], items: [] });
    const [hasError, setHasError] = useState(false);
    const {recipes, items} = listItems;
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

                const recipeData = await response.json(); 
                dispatch({ type: "setRecipes", payload: recipeData });
            } catch(err) {
                console.log(err.message);
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
                
                const itemData = await response.json();
                dispatch({ type: "setItems", payload: itemData });
            } catch(err) {
                console.log(err.message);
                hasNoItems = true;
            }
        }
        getItems();

        if (hasNoRecipes && hasNoItems) {
            setHasError(true);
        }
    }, [listId]);

    return (
        <table>
            <tbody>
                {recipes.map((recipe) => <RecipeRow key={recipe.id} recipeId={recipe.id} recipeName={recipe.recipeName}/>)}
            </tbody>
        </table>
    );
}

export default ShoppingListTable;