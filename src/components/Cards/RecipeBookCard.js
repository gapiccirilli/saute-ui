import styles from "./RecipeBookCard.module.css";
import Card from "./Card";
import { useState } from "react";
import { Link } from "react-router-dom";

function RecipeBookCard({ recipeBook, onDeleteBook }) {
    const {id, recipeBookName} = recipeBook;
    // eventually display delete/error message in temporary modal that fades in/out
    const [error, setError] = useState("");

    const onEdit = () => {

    };

    const onDelete = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/recipe-books/${id}`, 
            {method: "DELETE", headers: {"Content-Type": "application/json"}});
            
            if (!response.ok) {
                const errorMessage = await response.json();
                throw new Error(errorMessage);
            }

            onDeleteBook(id);
        } catch (err) {
            const {message} = err;
            setError(message);
        }
    };
    
    return (
        <Card showButtons={true} onDelete={onDelete}>
            <Link to={`${id}`}>
                <div className={styles.cardImg}>

                </div>
                <div className={styles.cardDesc}>
                    <p>{recipeBookName}</p>
                </div>
            </Link>
        </Card>
    );
}

export default RecipeBookCard;