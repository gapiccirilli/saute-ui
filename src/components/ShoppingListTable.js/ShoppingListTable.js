import RecipeRow from "./RecipeRow";
import { useEffect, useReducer, useState } from "react";
import styles from "./ShoppingListTable.module.css";
import ErrorMessage from "../Error/ErrorMessage";

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

function errorReducer(state, action) {
    switch (action.type) {
        case "setRecErr":
            return {...state, recErr: action.payload};
        case "setItemErr":
            return {...state, itemErr: action.payload};
        default:
            return {recErr: "State Error", itemErr: "State Error"};
    }
}

function ShoppingListTable({ listId, listName }) {
    const [listItems, dispatch] = useReducer(shoppingListReducer, { recipes: [], items: [] });
    const [errors, errDispatch] = useReducer(errorReducer, { recErr: false, itemErr: false });

    const {recipes, items} = listItems;
    const error = "No List Items";

    useEffect(() => {
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
                errDispatch({ type: "setRecErr", payload: true});
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
                errDispatch({ type: "setItemErr", payload: true});
            }
        }
        getItems();

        
    }, [listId]);

    return (
        <table>
            <tbody>
                {!errors.recErr && recipes.map((recipe) => <RecipeRow key={recipe.id} recipeId={recipe.id} recipeName={recipe.recipeName}/>)}
                {errors.recErr && errors.itemErr && <ErrorMessage message={error} />}
            </tbody>
        </table>
    );
}

export default ShoppingListTable;