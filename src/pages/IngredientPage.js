import IngredientCard from "../components/Cards/IngredientCard";
import AddNewCard from "../components/Cards/AddNewCard";
import ErrorMessage from "../components/Error/ErrorMessage";
import { useEffect, useState } from "react";
import Modal from "../components/Modals/Modal";
import { useModal } from "../hooks/useModal";

function IngredientPage() {
    const [ingredients, setIngredients] = useState([]);
    const [error, setError] = useState("");
    const [modalState, dispatch] = useModal();

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
        dispatch({type: "add-ingr", payload: {ingredients: ingredients}});
    };

    const handleEditIngredient = (ingredient) => {
        dispatch({type: "edit-ingr", payload: {ingredient: ingredient, ingredients: ingredients}});
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
            {modalState.isOpen && <Modal modalState={modalState} onClose={handleCloseModal} setData={setIngredients} />}
            {!error && ingredients.map((ingredient) => <IngredientCard ingredient={ingredient} key={ingredient.id} 
            onDeleteIngredient={handleIngredientDelete} onEditIngredient={handleEditIngredient} />)}
            {!error && <AddNewCard onAdd={handleAddIngredient}>Ingredient</AddNewCard>}
            {error && <ErrorMessage message={error}/>}
        </div>
    );
}

export default IngredientPage;