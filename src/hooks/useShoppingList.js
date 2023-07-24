import { useEffect, useReducer } from "react";

function shoppingListReducer(state, action) {

    switch (action.type) {
        case "setRecipes":
            return {...state, recipes: action.payload};
        case "setItems":
            return {...state, items: action.payload};
        case "setRecErr":
            return {...state, recErr: action.payload};
        case "setItemErr":
            return {...state, itemErr: action.payload};
        default:
            break;
    }
}

export function useShoppingList(urls) {
    const [listItems, dispatch] = useReducer(shoppingListReducer, { recipes: [], items: [], recErr: false, itemErr: false });

    useEffect(() => {
        async function getRecipes() {
            try {
                const response = await fetch(urls.getRecipes);

                if (!response.ok) {
                    const errorMessage = await response.json();
                    throw new Error(errorMessage.message);
                }

                const recipeData = await response.json(); 
                dispatch({ type: "setRecipes", payload: recipeData });
            } catch(err) {
                console.log(err.message);
                dispatch({ type: "setRecErr", payload: true});
            }
        }
        getRecipes();

        async function getItems() {
            try {
                const response = await fetch(urls.getItems);
                
                if (!response.ok) {
                    const errorMessage = await response.json();
                    throw new Error(errorMessage.message);
                }
                
                const itemData = await response.json();
                dispatch({ type: "setItems", payload: itemData });
            } catch(err) {
                console.log(err.message);
                dispatch({ type: "setItemErr", payload: true});
            }
        }
        getItems();

        
    }, [urls]);

    return [listItems, dispatch];
}