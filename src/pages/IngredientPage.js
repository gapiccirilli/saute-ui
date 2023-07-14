import IngredientCard from "../components/Cards/IngredientCard";
import AddNewCard from "../components/Cards/AddNewCard";
import ErrorMessage from "../components/Error/ErrorMessage";
import { useEffect, useReducer, useState } from "react";
import Modal from "../components/Modals/Modal";
import {ModalEventProvider} from "../contexts/ModalEventProvider";
import ModalOverlay from "../components/Modals/Modal";

function modalReducer(state, action) {
    const reducedState = { modalType: action.type, isOpen: true};
    switch (action.type) {
        case "add-book":
            return reducedState;
        case "edit-book":
            return reducedState;
        case "add-ingr":
            return reducedState;
        case "edit-ingr":
            return reducedState;
        case "add-list":
            return reducedState;
        case "edit-list":
            return reducedState;
        case "delete":
            return reducedState;
        case "close":
            return { modalType: action.type, isOpen: false};
        default:
            return {...state};
    }
}

function IngredientPage() {
    const [ingredients, setIngredients] = useState([]);
    const [modalState, dispatch] = useReducer(modalReducer, { modalType: "", isOpen: false});
    const {modalType, isOpen} = modalState;
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

    const handleEditIngredient = () => {
        dispatch({ type: "edit-ingr" });
    };

    const handleIngredientDelete = (ingredientId) => {
        setIngredients((prev) => {
            return prev.filter((ingredient) => ingredient.id !== ingredientId);
        });
    };

    const handleCloseModal = () => {
        dispatch({ type: "close" });
    };

    const values = {
        onClose: handleCloseModal,
        data: {
            type: modalType
        }
    };

    return (
        <div>
            {isOpen && <ModalEventProvider values={values}><ModalOverlay /></ModalEventProvider>}
            {!error && ingredients.map((ingredient) => <IngredientCard ingredient={ingredient} key={ingredient.id} 
            onDeleteIngredient={handleIngredientDelete} onEditIngredient={handleEditIngredient} />)}
            {!error && <AddNewCard onAdd={handleAddIngredient}>Ingredient</AddNewCard>}
            {error && <ErrorMessage message={error}/>}
        </div>
    );
}

export default IngredientPage;