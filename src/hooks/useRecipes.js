import { useReducer } from "react";

function reducer(state, action) {
    switch(action.type) {
        case "setRecipes":
            return {...state, recipes: action.payload};
        case "setError":
            return {...state, error: action.payload};
        case "setBoth":
            return {...state, recipes: action.payload.recipes, error: action.payload.err};
        default:
            throw new Error(`Action "${action.type}" is unknown`);
    }
}

export function useRecipes() {
    const initialState = {
        recipes: [],
        error: ""
    };
    const [recipeState, dispatch] = useReducer(reducer, initialState);

    function setRecs(recipes) {
        dispatch({type: "setRecipes", payload: recipes});
    }

    function setErr(error) {
        dispatch({type: "setError", payload: error});
    }

    function setBoth(recipes, error) {
        dispatch({type: "setBoth", payload: {recipes: recipes, err: error}});
    }

    return {
        recipeState,
        dispatchers: {
            setRecipes: setRecs,
            setError: setErr,
            setRecipesAndError: setBoth
        }
    };
}