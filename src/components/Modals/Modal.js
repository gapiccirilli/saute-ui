import { useFetchOnDemand } from "../../hooks/fetch";
import CloseButton from "../Buttons/CloseButton";
import SubmitButton from "../Buttons/SubmitButton";
import styles from "./Modal.module.css";
import { createPortal } from "react-dom";

function AddBookModal({onClose}) {

    return (
        <div className={`${styles.addBook} ${styles.modal}`}>
            Add Recipe Book
            <CloseButton onClose={onClose} />
        </div>
    );
}

function EditBookModal({onClose}) {

    return (
        <div className={`${styles.editBook} ${styles.modal}`}>
            Edit RecipeBook
            <CloseButton onClose={onClose} />
        </div>
    );
}

function AddRecipeModal({onClose}) {

    return (
        <div className={`${styles.addRecipe} ${styles.modal}`}>
            Add Recipe
            <CloseButton onClose={onClose} />
        </div>
    );
}

function EditRecipeModal({onClose}) {

    return (
        <div className={`${styles.editRecipe} ${styles.modal}`}>
            Edit Recipe
            <CloseButton onClose={onClose} />
        </div>
    );
}

function AddIngredientModal({onClose}) {

    return (
        <div className={`${styles.addIngr} ${styles.modal}`}>
            
            <CloseButton onClose={onClose}  />
        </div>
    );
}

function EditIngredientModal({onClose, ingredient}) {
    const {id, ingredientName} = ingredient;
    const [data, error, fetch] = useFetchOnDemand("PUT", `http://localhost:8080/api/ingredients/${id}`);

    const handleSubmit = (e) => {
        e.preventDefault();
        ingredient.ingredientName = e.target.value;
        fetch(ingredient);
        console.log(data); 
    };

    return (
        <div className={`${styles.editIngr} ${styles.modal}`}>
            <form>
                <input type="text" placeholder="Ingredient" value={ingredientName}/>
                <SubmitButton onSubmit={handleSubmit} />
            </form>
            <CloseButton onClose={onClose} />
        </div>
    );
}

function AddListModal({onClose}) {

    return (
        <div className={`${styles.addList} ${styles.modal}`}>
            Add ShoppingList
            <CloseButton onClose={onClose} />
        </div>
    );
}

function EditListModal({onClose}) {

    return (
        <div className={`${styles.editList} ${styles.modal}`}>
            Edit ShoppingList
            <CloseButton onClose={onClose} />
        </div>
    );
}

function DeleteModal({onClose}) {

    return (
        <div className={`${styles.delete} ${styles.modal}`}>
            Delete
            <CloseButton onClose={onClose} />
        </div>
    );
}



function Modal({modalState, onClose}) {
    const {modalType, ingredient} = modalState;

    return createPortal(
        <ModalOverlay> 
            {modalType === "add-book" && <AddBookModal onClose={onClose} />}
            {modalType === "edit-book" && <EditBookModal onClose={onClose} />}
            {modalType === "add-rec" && <AddRecipeModal onClose={onClose} />}
            {modalType === "edit-rec" && <EditRecipeModal onClose={onClose} />}
            {modalType === "add-ingr" && <AddIngredientModal onClose={onClose} />}
            {modalType === "edit-ingr" && <EditIngredientModal onClose={onClose} ingredient={ingredient} />}
            {modalType === "add-list" && <AddListModal onClose={onClose} />}
            {modalType === "edit-list" && <EditListModal onClose={onClose} />}
            {modalType === "delete" && <DeleteModal onClose={onClose} />}
            
        </ModalOverlay>,
        document.getElementById('root')
    );
}

function ModalOverlay({children}) {

    return (
        <div className={styles.overlay}>
            {children}
        </div>
    );
}

export default Modal;