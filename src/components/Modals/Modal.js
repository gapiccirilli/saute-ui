import { Fragment, useContext } from "react";
import CloseButton from "../Buttons/CloseButton";
import styles from "./Modal.module.css";
import { createPortal } from "react-dom";
import { ModalEventContext, ModalEventProvider } from "../../contexts/ModalEventProvider";

function AddBookModal() {
    const {onClose} = useContext(ModalEventContext);
    return (
        <div className={`${styles.addBook} ${styles.modal}`}>

        </div>
    );
}

function EditBookModal() {
    const {onClose} = useContext(ModalEventContext);
    return (
        <div className={`${styles.editBook} ${styles.modal}`}>

        </div>
    );
}

function AddIngredientModal() {
    const {onClose} = useContext(ModalEventContext);
    return (
        <div className={`${styles.addIngr} ${styles.modal}`}>
            Add Ingredient
            <CloseButton onClose={onClose} />
        </div>
    );
}

function EditIngredientModal() {
    const {onClose} = useContext(ModalEventContext);
    return (
        <div className={`${styles.editIngr} ${styles.modal}`}>

        </div>
    );
}

function AddListModal() {
    const {onClose} = useContext(ModalEventContext);
    return (
        <div className={`${styles.addList} ${styles.modal}`}>

        </div>
    );
}

function EditListModal() {
    const {data, onClose} = useContext(ModalEventContext);
    return (
        <div className={`${styles.editList} ${styles.modal}`}>

        </div>
    );
}

function DeleteModal() {
    const {data, onClose} = useContext(ModalEventContext);
    return (
        <div className={`${styles.delete} ${styles.modal}`}>
            
        </div>
    );
}



function Modal({type}) {

    return createPortal(
        <Fragment> 
            {type === "add-book" && <AddBookModal />}
            {type === "edit-book" && <EditBookModal />}
            {type === "add-ingr" && <AddIngredientModal />}
            {type === "edit-ingr" && <EditIngredientModal />}
            {type === "add-list" && <AddListModal />}
            {type === "edit-list" && <EditListModal />}
            {type === "delete" && <DeleteModal />}
            
        </Fragment>,
        document.getElementById('root')
    );
}

export default Modal;