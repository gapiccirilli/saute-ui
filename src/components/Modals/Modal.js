import { Fragment } from "react";
import styles from "./Modal.module.css";
import { createPortal } from "react-dom";

function AddBookModal() {

    return (
        <div className={`${styles.addBook} ${styles.modal}`}>

        </div>
    );
}

function EditBookModal() {

    return (
        <div className={`${styles.editBook} ${styles.modal}`}>

        </div>
    );
}

function AddIngredientModal() {

    return (
        <div className={`${styles.addIngr} ${styles.modal}`}>
            Add Ingredient
        </div>
    );
}

function EditIngredientModal() {

    return (
        <div className={`${styles.editIngr} ${styles.modal}`}>

        </div>
    );
}

function AddListModal() {

    return (
        <div className={`${styles.addList} ${styles.modal}`}>

        </div>
    );
}

function EditListModal() {

    return (
        <div className={`${styles.editList} ${styles.modal}`}>

        </div>
    );
}

function DeleteModal({data}) {

    return (
        <div className={`${styles.delete} ${styles.modal}`}>
            
        </div>
    );
}



function Modal({type, data}) {

    return createPortal(
        <Fragment> 
            {type === "add-book" && <AddBookModal />}
            {type === "edit-book" && <EditBookModal />}
            {type === "add-ingr" && <AddIngredientModal />}
            {type === "edit-ingr" && <EditIngredientModal />}
            {type === "add-list" && <AddListModal />}
            {type === "edit-list" && <EditListModal />}
            {type === "delete" && <DeleteModal data={data} />}
        </Fragment>,
        document.getElementById('root')
    );
}

export default Modal;