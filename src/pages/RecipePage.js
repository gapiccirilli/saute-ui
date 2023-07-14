import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import RecipeCard from "../components/Cards/RecipeCard";
import AddNewCard from "../components/Cards/AddNewCard";
import ErrorMessage from "../components/Error/ErrorMessage";
import BackButton from "../components/Buttons/BackButton";
import { useModal } from "../hooks/useModal";
import Modal from "../components/Modals/Modal";

function RecipePage() {
    const { bookId } = useParams();
    const [recipes, setRecipes] = useState([]);
    const [error, setError] = useState("");
    const [modalState, events] = useModal();

    useEffect(() => {
        async function getRecipes() {
            try {
                const response = await fetch(`http://localhost:8080/api/recipe-books/${bookId}/recipes`);

                if (!response.ok) {
                    const errorMessage = await response.json();
                    throw new Error(errorMessage.message);
                }

                const data = await response.json();

                setRecipes(data);
            } catch(err) {
                const {message} = err;
                setError(message);
            }
        }
        getRecipes();
    }, [bookId]);

    const handleAddRecipe = () => {
        events.add("add-rec");
    };

    const handleEditRecipe = (recipe) => {
        events.edit("edit-rec", recipe);
    };

    const handleRecipeDelete = (recipeId) => {
        setRecipes((prev) => {
            return prev.filter((recipe) => recipe.id !== recipeId);
        });
    };

    const handleCloseModal = () => {
        events.close();
    };
    
    
    return (
        <div>
            <BackButton />
            {modalState.isOpen && <Modal modalState={modalState} onClose={handleCloseModal} />}
            {!error && recipes.map((recipe) => <RecipeCard recipe={recipe} key={recipe.id} onDeleteRecipe={handleRecipeDelete}
            onEditRecipe={handleEditRecipe}/>)}
            {!error && <AddNewCard onAdd={handleAddRecipe}>Recipe</AddNewCard>}
            {error && <ErrorMessage message={error}/>}
        </div>
    );
}

export default RecipePage;