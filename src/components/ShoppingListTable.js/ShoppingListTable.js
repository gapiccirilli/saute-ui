import RecipeRow from "./RecipeRow";
import { ShoppingListContext } from "../../contexts/ShoppingListTableProvider";
import { useContext } from "react";
import styles from "./ShoppingListTable.module.css";

function ShoppingListTable() {

    const { listName, recipes, items} = useContext(ShoppingListContext);
    return (
        <table>
            {/* <th>
                {listName}
            </th> */}
            {recipes.map((recipe) => <RecipeRow key={recipe.id} recipeId={recipe.id} recipeName={recipe.recipeName}/>)}
        </table>
    );
}

export default ShoppingListTable;