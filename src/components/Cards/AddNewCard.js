import { useState } from "react";
import styles from "./AddNewCard.module.css";
import Card from "./Card";

function AddNewCard({ children, onAdd}) {
    
    const handleOpenModal = () => {
        onAdd();
    }

    return (
        <Card showButtons={false}>
            <div className={styles.container} onClick={handleOpenModal}>
                <p className={styles.plus}>+</p>
                <p className={styles.txt}>Add New {children}</p>
            </div>
        </Card>
    );
}

export default AddNewCard;