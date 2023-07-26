import { useReducer } from "react";

function reducer(state, action) {
    switch(action.type) {
        case "setShoppingLists":
            return {...state, shoppingLists: action.payload};
        case "setError":
            return {...state, error: action.payload};
        case "setBoth":
            return {...state, shoppingLists: action.payload.shoppingLists, error: action.payload.err};
        default:
            throw new Error(`Action "${action.type}" is unknown`);
    }
}

export function useShoppingList() {
    const initialState = {
        shoppingLists: [],
        error: ""
    };
    const [shoppingListState, dispatch] = useReducer(reducer, initialState);

    function setLists(lists) {
        dispatch({type: "setShoppingLists", payload: lists});
    }

    function setErr(error) {
        dispatch({type: "setError", payload: error});
    }

    function setBoth(lists, error) {
        dispatch({type: "setBoth", payload: {shoppingLists: lists, err: error}});
    }

    return {
        shoppingListState,
        dispatchers: {
            setShoppingLists: setLists,
            setError: setErr,
            setShoppingListsAndError: setBoth
        }
    };
}