import IngredientCard from "../components/Cards/IngredientCard";
import AddNewCard from "../components/Cards/AddNewCard";
import ErrorMessage from "../components/Error/ErrorMessage";
import { useEffect, useState } from "react";
import Modal from "../components/Modals/Modal";
import { useModal } from "../hooks/useModal";
import { IngredientModalProvider } from "../contexts/IngredientModalProvider";

function IngredientPage() {
    const [ingredients, setIngredients] = useState([]);
    const [error, setError] = useState("");
    const [modalState, events] = useModal();
    const ingredientState = {
        ingredients: ingredients,
        setIngredients: setIngredients,
        currentIngredient: {}
    };

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
        events.add("add-ingr");
    };

    const handleEditIngredient = (ingredient) => {
        ingredientState.currentIngredient = ingredient;
        events.edit("edit-ingr");
    };

    const handleIngredientDelete = (ingredientId) => {
        setIngredients((prev) => {
            return prev.filter((ingredient) => ingredient.id !== ingredientId);
        });
    };

    const handleCloseModal = () => {
        events.close();
    };
    return (
        <div>
            <IngredientModalProvider ingredientState={ingredientState}>
                {modalState.isOpen && <Modal modalType={modalState.modalType} onClose={handleCloseModal} />}
            </IngredientModalProvider>
            {!error && ingredients.map((ingredient) => <IngredientCard ingredient={ingredient} key={ingredient.id} 
            onDeleteIngredient={handleIngredientDelete} onEditIngredient={handleEditIngredient} />)}
            {!error && <AddNewCard onAdd={handleAddIngredient} >Ingredient</AddNewCard>}
            {error && <ErrorMessage message={error}/>}
        </div>
    );
}

export default IngredientPage;