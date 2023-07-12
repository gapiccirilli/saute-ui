import { useEffect, useState } from "react";
import styles from "./ShoppingListTable.module.css";
import Item from "../Item/Item";

function RecipeRow({ recipeId, recipeName}) {
    const [items, setItems] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        async function getRecipeItems() {
            console.log(recipeId);
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
        items.map((item) => <tr><Item item={item} basic={true} /></tr>)
    );
}

export default RecipeRow;