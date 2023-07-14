import { useState } from "react";

function modalReducer(state, action) {
    const reducedState = { modalType: action.type, isOpen: true};
    switch (action.type) {
        case "add-book":
            return { modalType: action.type, data: {...state.data, recipeBook: action.payload}, isOpen: true};
        case "edit-book":
            return { modalType: action.type, data: {...state.data, recipeBook: action.payload}, isOpen: true};
        case "add-ingr":
            return { modalType: action.type, data: {...state.data, ingredient: action.payload}, isOpen: true};
        case "edit-ingr":
            return { modalType: action.type, data: {...state.data, ingredient: action.payload}, isOpen: true};
        case "add-list":
            return { modalType: action.type, data: {...state.data, list: action.payload}, isOpen: true};
        case "edit-list":
            return { modalType: action.type, data: {...state.data, list: action.payload}, isOpen: true};
        case "delete":
            return reducedState;
        case "close":
            return { modalType: action.type, isOpen: false};
        default:
            return {...state};
    }
}

export function useModal() {
    const [modalState, dispatch] = useReducer(modalReducer, {
        modalType: "",
        data: {
            ingredient: {},
            recipe: {},
            recipeBook: {},
            list: {},
            item: {}
    } , isOpen: false});

    const handleAddIngredient = () => {
        dispatch({ type: "add-ingr" });
    };

    const handleEditIngredient = () => {
        dispatch({ type: "edit-ingr", payload: ingredient });
    };

    const handleCloseModal = () => {
        dispatch({ type: "close" });
    };
}