import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import RecipeCard from "../components/Cards/RecipeCard";
import AddNewCard from "../components/Cards/AddNewCard";
import ErrorMessage from "../components/Error/ErrorMessage";

function RecipePage() {
    const { id } = useParams();
    const [recipes, setRecipes] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        async function getRecipes() {
            try {
                const response = await fetch(`http://localhost:8080/api/recipe-books/${id}/recipes`);

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
    }, [id]);

    
    
    return (
        <div>
            {/* use in production */}
            {!error && recipes.map((recipe) => <RecipeCard recipe={recipe} key={recipe.id} />)}
            {!error && <AddNewCard>Recipe</AddNewCard>}
            {error && <ErrorMessage message={error}/>}
        </div>
    );
}

export default RecipePage;