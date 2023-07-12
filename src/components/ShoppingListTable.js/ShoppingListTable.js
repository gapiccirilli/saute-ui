import RecipeRow from "./RecipeRow";
import styles from "./ShoppingListTable.module.css";

function ShoppingListTable({ listName }) {


    return (
        <table>
            <th>
                <td>{listName}</td>
            </th>
            {/* {recipes.map((recipe) => <RecipeRow />)} */}
        </table>
    );
}

export default ShoppingListTable;