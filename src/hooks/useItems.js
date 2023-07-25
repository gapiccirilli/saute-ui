import { useReducer } from "react";

function reducer(state, action) {
    switch(action.type) {
        case "setItems":
            return {...state, items: action.payload};
        case "setError":
            return {...state, error: action.payload};
        case "setBoth":
            return {...state, items: action.payload.items, error: action.payload.err};
        default:
            throw new Error(`Action "${action.type}" is unknown`);
    }
}

export function useItems() {
    const initialState = {
        items: [],
        error: ""
    };
    const [itemState, dispatch] = useReducer(reducer, initialState);

    function setItms(items) {
        dispatch({type: "setItems", payload: items});
    }

    function setErr(error) {
        dispatch({type: "setError", payload: error});
    }

    function setBoth(items, error) {
        dispatch({type: "setBoth", payload: {items: items, err: error}});
    }

    return {
        itemState,
        setters: {
            setItems: setItms,
            setError: setErr,
            setItemsAndError: setBoth
        }
    };
}