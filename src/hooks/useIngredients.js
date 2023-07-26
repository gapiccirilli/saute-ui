import { useReducer } from "react";

function reducer(state, action) {
    switch(action.type) {
        case "setIngredients":
            return {...state, ingredients: action.payload};
        case "setError":
            return {...state, error: action.payload};
        case "setBoth":
            return {...state, ingredients: action.payload.ingredients, error: action.payload.err};
        default:
            throw new Error(`Action "${action.type}" is unknown`);
    }
}

export function useIngredients() {
    const initialState = {
        ingredients: [],
        error: ""
    };
    const [ingredientState, dispatch] = useReducer(reducer, initialState);

    function setIngrs(ingredients) {
        dispatch({type: "setIngredients", payload: ingredients});
    }

    function setErr(error) {
        dispatch({type: "setError", payload: error});
    }

    function setBoth(ingredients, error) {
        dispatch({type: "setBoth", payload: {ingredient: ingredients, err: error}});
    }

    return {
        ingredientState,
        dispatchers: {
            setIngredients: setIngrs,
            setError: setErr,
            setIngredientsAndError: setBoth
        }
    };
}