import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ErrorMessage from "../components/Error/ErrorMessage";

function SingleRecipePage() {
    const { recipeId } = useParams();
    const [{recipeName, description}, setRecipe] = useState({});
    const [items, setItems] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        async function getItems() {
            try {
                const response = await fetch(`http://localhost:8080/api/recipes/${recipeId}/items/multiple`);
                
                if (!response.ok) {
                    const errorMessage = await response.json();
                    throw new Error(errorMessage.message);
                }
                
                const data = await response.json();
                setItems(data);
            } catch(err) {
                const {message} = err;
                setError(message);
            }
        }
        getItems();
    }, [recipeId]);
    
    
    return (
        <div>
            <div>
                <h1>{recipeName}</h1>
                <h6>{description}</h6>
            </div>
            {error && <ErrorMessage message={error}/>}
        </div>
    );
}

export default SingleRecipePage;