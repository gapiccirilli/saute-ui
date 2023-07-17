import { useReducer } from "react";

function modalReducer(state, action) {
    const reducedState = { modalType: action.type, isOpen: true};
    switch (action.type) {
        case "add-book":
            return { modalType: action.type, data: {...state.data, recipeBook: action.payload}, isOpen: true};
        case "edit-book":
            return { modalType: action.type, data: {...state.data, recipeBook: action.payload}, isOpen: true};
        case "add-rec":
            return { modalType: action.type, data: {...state.data, recipe: action.payload}, isOpen: true};
        case "edit-rec":
            return { modalType: action.type, data: {...state.data, recipe: action.payload}, isOpen: true};
        case "add-ingr":
            return { modalType: action.type, data: {...state.data, ingredient: action.payload}, isOpen: true};
        case "edit-ingr":
            return { modalType: action.type, data: {...state.data, ingredient: action.payload.ingredient, 
                ingredients: action.payload.ingredients}, isOpen: true};
        case "add-list":
            return { modalType: action.type, data: {...state.data, list: action.payload}, isOpen: true};
        case "edit-list":
            return { modalType: action.type, data: {...state.data, list: action.payload}, isOpen: true};
        case "delete":
            return reducedState;
        case "close":
            return {...state, modalType: action.type, isOpen: false};
        default:
            return {...state};
    }
}

export function useModal() {
    const [modalState, dispatch] = useReducer(modalReducer, {
        modalType: "close",
        data: {
            ingredients: [],
            ingredient: {},
            recipe: {},
            recipeBook: {},
            list: {},
            item: {}
    } , isOpen: false});

    function handleAddModal(type) {
        dispatch({ type: type });
    };
    
    function handleEditModal(type, payload) {
        dispatch({ type: type, payload: payload });
    };
    
    function handleCloseModal() {
        dispatch({ type: "close" });
    };

    const events = {
        add: handleAddModal,
        edit: handleEditModal,
        close: handleCloseModal
    }

    return [modalState, events];
}