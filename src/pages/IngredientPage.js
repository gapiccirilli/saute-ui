import IngredientCard from "../components/Cards/IngredientCard";
import AddNewCard from "../components/Cards/AddNewCard";
import ErrorMessage from "../components/Error/ErrorMessage";
import { useEffect, useReducer, useState } from "react";
import {ModalEventProvider} from "../contexts/ModalEventProvider";
import Modal from "../components/Modals/Modal";

function modalReducer(state, action) {
    const reducedState = { modalType: action.type, isOpen: true};

    switch (action.type) {
        case "add-book":
            return reducedState;
        case "edit-book":
            return { modalType: action.type, data: {...state.data, recipeBook: action.payload}, isOpen: true};
        case "add-ingr":
            return { modalType: action.type, data: {...state.data}, isOpen: true};
        case "edit-ingr":
            return { modalType: action.type, data: {...state.data, ingredient: action.payload}, isOpen: true};
        case "add-list":
            return reducedState;
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

function IngredientPage() {
    const [ingredients, setIngredients] = useState([]);
    const [modalState, dispatch] = useReducer(modalReducer, {
        modalType: "close",
        data: {
            ingredient: {},
            recipe: {},
            recipeBook: {},
            list: {},
            item: {}
    } , isOpen: false});
    
    const [error, setError] = useState("");

    useEffect(() => {
        async function getIngredients() {
            try {
                const response = await fetch("http://localhost:8080/api/ingredients");

            if (!response.ok) {
                const errorMessage = await response.json();
                throw new Error(errorMessage.message);
            }

            const data = await response.json();

            setIngredients(data);
            } catch(err) {
                const {message} = err;
                setError(message);
            }
        }
        getIngredients();
    }, [])

    const handleAddIngredient = () => {
        dispatch({ type: "add-ingr" });
    };

    const handleEditIngredient = (ingredient) => {
        dispatch({ type: "edit-ingr", payload: ingredient });
    };

    const handleIngredientDelete = (ingredientId) => {
        setIngredients((prev) => {
            return prev.filter((ingredient) => ingredient.id !== ingredientId);
        });
    };

    const handleCloseModal = () => {
        dispatch({ type: "close" });
    };

    return (
        <div>
            {modalState.isOpen && <Modal modalState={modalState} onClose={handleCloseModal} />}
            {!error && ingredients.map((ingredient) => <IngredientCard ingredient={ingredient} key={ingredient.id} 
            onDeleteIngredient={handleIngredientDelete} onEditIngredient={handleEditIngredient} />)}
            {!error && <AddNewCard onAdd={handleAddIngredient} >Ingredient</AddNewCard>}
            {error && <ErrorMessage message={error}/>}
        </div>
    );
}

export default IngredientPage;