import { useReducer } from "react";

function reducer(state, action) {
    switch(action.type) {
        case "setRecipeBooks":
            return {...state, recipeBooks: action.payload};
        case "setError":
            return {...state, error: action.payload};
        case "setBoth":
            return {...state, recipeBooks: action.payload.recipeBooks, error: action.payload.err};
        default:
            throw new Error(`Action "${action.type}" is unknown`);
    }
}

export function useRecipeBooks() {
    const initialState = {
        recipeBooks: [],
        error: ""
    };
    const [bookState, dispatch] = useReducer(reducer, initialState);

    function setBooks(recipeBooks) {
        dispatch({type: "setRecipeBooks", payload: recipeBooks});
    }

    function setErr(error) {
        dispatch({type: "setError", payload: error});
    }

    function setBoth(recipeBooks, error) {
        dispatch({type: "setBoth", payload: {recipeBooks: recipeBooks, err: error}});
    }

    return {
        bookState,
        dispatchers: {
            setRecipeBooks: setBooks,
            setError: setErr,
            setRecipeBooksAndError: setBoth
        }
    };
}