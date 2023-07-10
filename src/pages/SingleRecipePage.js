import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import RecipeCard from "../components/Cards/RecipeCard";
import AddNewCard from "../components/Cards/AddNewCard";
import ErrorMessage from "../components/Error/ErrorMessage";

function SingleRecipePage() {
    const { recipeId } = useParams();
    const [recipe, setRecipe] = useState({});
    const [items, setItems] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        async function getItems() {
            
        }
        getItems();
    }, []);
    
    
    return (
        <div>
            <div>RECIPE</div>
            {error && <ErrorMessage message={error}/>}
        </div>
    );
}

export default SingleRecipePage;