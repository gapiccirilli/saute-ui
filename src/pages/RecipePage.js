import styles from "./Page.module.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import RecipeCard from "../components/Cards/RecipeCard";
import AddButton from "../components/Buttons/AddButton";
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

    const handleAddRecipe = () => {
        dispatch({type: "add-rec", payload: {recipes: recipes}});
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
            {isLoading && <Load />}
            {modalState.isOpen && <Modal modalState={modalState} onClose={handleCloseModal} setData={setters} />}
            {!error && !isLoading && <nav className={styles.gridNav}>
                <BackButton />
                <AddButton className="button-site-theme flex-add" onAdd={handleAddRecipe}>Add Recipe</AddButton>
                </nav>}
            {!error && !isLoading && <div className={styles.gridContent}>
                {recipes.map((recipe) => <RecipeCard recipe={recipe} key={recipe.id} onDeleteRecipe={handleRecipeDelete}
            onEditRecipe={handleEditRecipe}/>)}</div>}
            {error && <ErrorMessage message={error}/>}
        </div>
    );
}

export default RecipePage;