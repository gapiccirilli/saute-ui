import styles from "./Page.module.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import RecipeCard from "../components/Cards/RecipeCard";
import AddNewCard from "../components/Cards/AddNewCard";
import ErrorMessage from "../components/Error/ErrorMessage";
import BackButton from "../components/Buttons/BackButton";
import { useModal } from "../hooks/useModal";
import Modal from "../components/Modals/Modal";
import Load from "../loaders/Load";
import { useFetch } from "../hooks/useFetch";

function RecipePage() {
    const { bookId } = useParams();
    const [recipes, setRecipes] = useState([]);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [modalState, dispatch] = useModal();

    useFetch(`http://localhost:8080/api/recipe-books/${bookId}/recipes`, 
    {setData: setRecipes, setErr: setError, setLoad: setIsLoading});

    const handleAddRecipe = (bookId) => {
        dispatch({type: "add-rec", payload: {recipes: recipes, bookId: bookId}});
    };

    const handleEditRecipe = (recipe) => {
        dispatch({type: "edit-rec", payload: {recipe: recipe, recipes: recipes}});
    };

    const handleRecipeDelete = (recipeId) => {
        setRecipes((prev) => {
            return prev.filter((recipe) => recipe.id !== recipeId);
        });
    };

    const handleCloseModal = () => {
        dispatch({ type: "close" });
    };
    
    const setters = {
        setRecs: setRecipes,
        setLoad: setIsLoading,
        setErr: setError
    };
    
    return (
        <div className={styles.page}>
            <BackButton />
            {isLoading && <Load />}
            {modalState.isOpen && <Modal modalState={modalState} onClose={handleCloseModal} setData={setters} />}
            {!error && recipes.map((recipe) => <RecipeCard recipe={recipe} key={recipe.id} onDeleteRecipe={handleRecipeDelete}
            onEditRecipe={handleEditRecipe}/>)}
            {!error && <AddNewCard onAdd={handleAddRecipe} id={bookId}>Recipe</AddNewCard>}
            {error && <ErrorMessage message={error}/>}
        </div>
    );
}

export default RecipePage;