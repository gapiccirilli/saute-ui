import IngredientCard from "../components/Cards/IngredientCard";
import AddNewCard from "../components/Cards/AddNewCard";
import ErrorMessage from "../components/Error/ErrorMessage";
import { useEffect, useState } from "react";

function IngredientPage() {
    const [ingredients, setIngredients] = useState([]);
    const [error, setError] = useState("");

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

    const handleIngredientDelete = (ingredientId) => {
        setIngredients((prev) => {
            return prev.filter((ingredient) => ingredient.id !== ingredientId);
        });
    };

    return (
        <div>
            {!error && ingredients.map((ingredient) => <IngredientCard ingredient={ingredient} key={ingredient.id} 
            onDeleteIngredient={handleIngredientDelete} />)}
            {!error && <AddNewCard>Ingredient</AddNewCard>}
            {error && <ErrorMessage message={error}/>}
        </div>
    );
}

export default IngredientPage;