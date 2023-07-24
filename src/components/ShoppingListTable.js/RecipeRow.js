import { Fragment, useEffect, useState } from "react";
import styles from "./RecipeRow.module.css";
import Item from "../Item/Item";
import ErrorMessage from "../Error/ErrorMessage";

function RecipeRow({ recipeId, recipeName}) {
    const [items, setItems] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        async function getRecipeItems() {
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
        getRecipeItems();
    }, []);

    return (
         <tbody className={styles.recipe}>
            {!error && <tr><th className={styles.recTitle} colSpan="3">{recipeName}</th></tr>}
            {!error && items.map((item) => <tr><Item item={item} basic={true} showButtons={false} key={item.id} /></tr>)}
         </tbody>
    );
}

export default RecipeRow;