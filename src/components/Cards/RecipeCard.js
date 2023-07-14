import { Link } from "react-router-dom";
import styles from "./RecipeCard.module.css";
import Card from "./Card";
import { useState } from "react";

function RecipeCard({ recipe, onDeleteRecipe, onEditRecipe }) {
    const {id, recipeName, description} = recipe;
    const url = `recipes/${id}?name=${recipeName}&desc=${description}`;
    // eventually display delete/error message in temporary modal that fades in/out
    const [error, setError] = useState("");

    const onEdit = () => {
        onEditRecipe(recipe);
    };

    const onDelete = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/recipes/${id}`, 
            {method: "DELETE", headers: {"Content-Type": "application/json"}});
            
            if (!response.ok) {
                const errorMessage = await response.json();
                throw new Error(errorMessage);
            }

            onDeleteRecipe(id);
        } catch (err) {
            const {message} = err;
            setError(message);
        }
    };

    return (
        <Card showButtons={true} onEdit={onEdit} onDelete={onDelete}>
            <Link to={url}>
            <div className={styles.cardImg}>

            </div>
            <div className={styles.cardDesc}>
                <p className={styles.title}>{recipeName}</p>
                <p className={styles.desc}>{description}</p>
            </div>
            </Link>
        </Card>
    );
}

export default RecipeCard;