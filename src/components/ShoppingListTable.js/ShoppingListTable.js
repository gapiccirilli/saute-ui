import RecipeRow from "./RecipeRow";
import { useEffect, useState } from "react";
import styles from "./ShoppingListTable.module.css";

function ShoppingListTable({listId, listName, items}) {
    const [recipes, setRecipes] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        async function getRecipes() {
            try {
                const response = await fetch(`http://localhost:8080/api/shopping-lists/${listId}/recipes`);

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
    }, [listId]);

    return (
        <table>
            <th>
                <td>{listName}</td>
            </th>
            {recipes.map((recipe) => <RecipeRow recipe={recipe} items={items} key={recipe.id} />)}
        </table>
    );
}

export default ShoppingListTable;