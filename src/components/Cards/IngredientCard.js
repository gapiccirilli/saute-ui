import Card from "./Card";
import styles from "./IngredientCard.module.css";
import { useState } from "react";

function IngredientCard({ ingredient, onDeleteIngredient, onEditIngredient }) {
    const { id, ingredientName, numberOfRecipes } = ingredient;
    // eventually display delete/error message in temporary modal that fades in/out
    const [error, setError] = useState("");

    const onEdit = () => {
        onEditIngredient(ingredient);
    };

    const onDelete = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/ingredients/${id}`, 
            {method: "DELETE", headers: {"Content-Type": "application/json"}});
            
            if (!response.ok) {
                const errorMessage = await response.json();
                throw new Error(errorMessage);
            }

            onDeleteIngredient(id);
        } catch (err) {
            const {message} = err;
            setError(message);
        }
    };
    
    return (
        <Card showButtons={true} onDelete={onDelete} onEdit={onEdit} >
            <div className={styles.cardImg}>

            </div>
            <div className={styles.cardDesc}>
                <p className={styles.name}>{ingredientName}</p>
                <p className={styles.recipeNums}>{numberOfRecipes}</p>
            </div>
        </Card>
    );
}

export default IngredientCard;