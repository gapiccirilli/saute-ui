import Card from "./Card";
import { useState } from "react";
import styles from "./ShoppingListCard.module.css";
import { Link } from "react-router-dom";

function ShoppingListCard({ list, onDeleteList }) {
    const { id, listName } = list;
    // eventually display delete/error message in temporary modal that fades in/out
    const [error, setError] = useState("");

    const url = `${id}?name=${listName}`;

    const onEdit = () => {

    };

    const onDelete = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/shopping-lists/${id}`, 
            {method: "DELETE", headers: {"Content-Type": "application/json"}});
            
            if (!response.ok) {
                const errorMessage = await response.json();
                throw new Error(errorMessage);
            }

            onDeleteList(id);
        } catch (err) {
            const {message} = err;
            setError(message);
        }
    };
    
    return (
        <Card showButtons={true} onDelete={onDelete}>
            <Link to={url}>
                <div className={styles.cardImg}>

                </div>
                <div className={styles.cardDesc}>
                    <p className={styles.title}>{listName}</p>
                </div>
            </Link>
        </Card>
    );
}

export default ShoppingListCard;