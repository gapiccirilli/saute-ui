import RecipeRow from "./RecipeRow";
import Item from "../Item/Item";
import { useState } from "react";
import styles from "./ShoppingListTable.module.css";
import ErrorMessage from "../Error/ErrorMessage";
import { useFetch } from "../../hooks/useFetch";

function ShoppingListTable({ listId }) {
    const [items, setItems] = useState([]);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState("");
    useFetch(`http://localhost:8080/api/shopping-lists/${listId}/items/multiple`,
    {
        setData: setItems,
        setErr: setError,
        setLoad: setIsLoading
    });

    const errorStr = "No List Items";

    return (
        <table className={styles.listTable}>
            {!error && !isLoading && 
            items.map((item) => <tr className={styles.item}><Item item={item} basic={true} showButtons={true} /></tr>)}
            {error && !isLoading && <ErrorMessage message={errorStr} />}
        </table>
    );
}

export default ShoppingListTable;