import styles from "./Page.module.css";
import IngredientCard from "../components/Cards/IngredientCard";
import AddNewCard from "../components/Cards/AddNewCard";
import ErrorMessage from "../components/Error/ErrorMessage";
import { useEffect, useState } from "react";
import Modal from "../components/Modals/Modal";
import { useModal } from "../hooks/useModal";
import Load from "../loaders/Load";
import { useFetch } from "../hooks/useFetch";

function IngredientPage() {
    const [ingredients, setIngredients] = useState([]);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [modalState, dispatch] = useModal();

    useFetch("http://localhost:8080/api/ingredients", {setData: setIngredients, setErr: setError, setLoad: setIsLoading});

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

    const setters = {
        setIng: setIngredients,
        setLoad: setIsLoading,
        setErr: setError
    };

    return (
        <div className={styles.page}>
            {isLoading && <Load />}
            {modalState.isOpen && <Modal modalState={modalState} onClose={handleCloseModal} setData={setters} />}
            {!error && ingredients.map((ingredient) => <IngredientCard ingredient={ingredient} key={ingredient.id} 
            onDeleteIngredient={handleIngredientDelete} onEditIngredient={handleEditIngredient} />)}

            {!error && <AddNewCard onAdd={handleAddIngredient}>Ingredient</AddNewCard>}
            {error && <ErrorMessage message={error}/>}
        </div>
    );
}

export default IngredientPage;