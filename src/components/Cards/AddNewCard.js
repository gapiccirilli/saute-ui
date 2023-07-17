import { useState } from "react";
import styles from "./AddNewCard.module.css";
import Card from "./Card";

function AddNewCard({ children, onAdd, id}) {

    const handleAdd = () => {
        onAdd(id);
    };

    return (
        <Card showButtons={false}>
            <div className={styles.container} onClick={handleAdd}>
                <p className={styles.plus}>+</p>
                <p className={styles.txt}>Add New {children}</p>
            </div>
        </Card>
    );
}

export default AddNewCard;