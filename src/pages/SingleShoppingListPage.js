import { useParams, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ErrorMessage from "../components/Error/ErrorMessage";
import BackButton from "../components/Buttons/BackButton";
import Item from "../components/Item/Item";
import styles from "./PageStyles/SingleRecipePage.module.css";
import ShoppingListTable from "../components/ShoppingListTable.js/ShoppingListTable";

function SingleShoppingListPage() {
    const { listId } = useParams();
    const [listParams, setListParams] = useSearchParams();
    const [items, setItems] = useState([]);
    const [error, setError] = useState("");

    const listName = listParams.get("name");

    useEffect(() => {
        async function getItems() {
            try {
                const response = await fetch(`http://localhost:8080/api/shopping-lists/${listId}/items/multiple`);
                
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
        getItems();
    }, [listId]);
    
    
    return (
        <div>
            <ShoppingListTable listId={listId} listName={listName} />
            {error && <ErrorMessage message={error}/>}

        </div>
    );
}

export default SingleShoppingListPage;