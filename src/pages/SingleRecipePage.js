import { useParams, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ErrorMessage from "../components/Error/ErrorMessage";
import BackButton from "../components/Buttons/BackButton";
import Item from "../components/Item/Item";

function SingleRecipePage() {
    const { recipeId } = useParams();
    const [recipeParams, setRecipeParams] = useSearchParams();
    const [items, setItems] = useState([]);
    const [error, setError] = useState("");

    const recipeName = recipeParams.get("name");
    const description = recipeParams.get("desc");

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
            <header>
                <BackButton />
                <h1>{recipeName}</h1>
                <p>{description}</p>
                <ul>
                    {items.map((item) => <Item item={item} />)}
                </ul>
            </header>
            {error && <ErrorMessage message={error}/>}

        </div>
    );
}

export default SingleRecipePage;