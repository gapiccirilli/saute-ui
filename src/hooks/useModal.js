import { useReducer } from "react";

function modalReducer(state, action) {

    switch (action.type) {
        case "add-book":
            return { modalType: action.type, isOpen: true};
        case "edit-book":
            return { modalType: action.type, isOpen: true};
        case "add-rec":
            return { modalType: action.type, isOpen: true};
        case "edit-rec":
            return { modalType: action.type, isOpen: true};
        case "add-ingr":
            return { modalType: action.type, isOpen: true};
        case "edit-ingr":
            return { modalType: action.type, isOpen: true};
        case "add-list":
            return { modalType: action.type, isOpen: true};
        case "edit-list":
            return { modalType: action.type, isOpen: true};
        case "delete":
            return {};
        case "close":
            return {modalType: action.type, isOpen: false};
        default:
            return {...state};
    }
}

export function useModal() {
    const [modalState, dispatch] = useReducer(modalReducer, {
        modalType: "close",
        isOpen: false});

    function handleAddModal(type) {
        dispatch({ type: type });
    };
    
    function handleEditModal(type) {
        dispatch({ type: type});
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