import { useRef, useState } from "react";
import { fetchData } from "../../hooks/fetch";
import CloseButton from "../Buttons/CloseButton";
import SubmitButton from "../Buttons/SubmitButton";
import styles from "./Modal.module.css";
import { createPortal } from "react-dom";

function AddBookModal({onClose, data, setData}) {
    const {recipeBooks} = data;
    const {setBooks, setLoad, setErr} = setData;

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newBook = {recipeBookName: e.target.elements[0].value}
        const response = await fetchData({
            type: "POST",
            url: "http://localhost:8080/api/recipe-books",
            payload: newBook,
            setIsLoading: setLoad
        });

        if (response.id) {
            setBooks([...recipeBooks, response]);
        } else {
            setErr(response);
        }
        onClose();
    };

    return (
        <div className={`${styles.addBook} ${styles.modal}`}>
            <form className={styles.bookForm} onSubmit={handleSubmit}>
                <label htmlFor="book-name">Recipe Book Name: </label>
                <input type="text" id="book-name" placeholder="New Recipe Book" />
                <button type="submit">Submit</button>
            </form>
            <CloseButton onClose={onClose} />
        </div>
    );
}

function EditBookModal({onClose, data, setData}) {
    const {recipeBooks, recipeBook} = data;
    const {setBooks, setLoad, setErr} = setData;

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newBook = {...recipeBook, recipeBookName: e.target.elements[0].value}
        const response = await fetchData({
            type: "PUT",
            url: `http://localhost:8080/api/recipe-books/${recipeBook.id}`,
            payload: newBook,
            setIsLoading: setLoad
        });

        const bookList = recipeBooks.map((book) => book.id === response.id ? response : book);

        if (response.id) {
            setBooks(bookList);
        } else {
            setErr(response);
        }
        
        onClose();
    };
    
    return (
        <div className={`${styles.editBook} ${styles.modal}`}>
            <form className={styles.bookForm} onSubmit={handleSubmit}>
                <label htmlFor="book-name">Recipe Book Name: </label>
                <input type="text" id="book-name" placeholder="Recipe Book" defaultValue={recipeBook.recipeBookName} />
                <button type="submit">Submit</button>
            </form>
            <CloseButton onClose={onClose} />
        </div>
    );
}

function AddRecipeModal({onClose, data, setData}) {
    const {recipes, bookId} = data;
    const {setRecs, setLoad, setErr} = setData;

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newRecipe = {recipeName: e.target.elements[0].value, description: e.target.elements[1].value};
        const response = await fetchData({
            type: "POST",
            url: `http://localhost:8080/api/recipe-books/${bookId}/recipes`,
            payload: newRecipe,
            setIsLoading: setLoad
        });

        if (response.id) {
            setRecs([...recipes, response]);
        } else {
            setErr(response);
        }
        onClose();
    };
    return (
        <div className={`${styles.addRecipe} ${styles.modal}`}>
            <form className={styles.recipeForm} onSubmit={handleSubmit}>
                <label htmlFor="recipe-name">Recipe Name: </label>
                <input type="text" id="recipe-name" placeholder="Recipe Name" />
                <label htmlFor="recipe-desc">Description: </label>
                <input type="text" id="recipe-desc" placeholder="Description" />
                <button type="submit">Submit</button>
            </form>
            <CloseButton onClose={onClose} />
        </div>
    );
}

function EditRecipeModal({onClose, data, setData}) {
    const {recipes, recipe} = data;
    const {setRecs, setLoad, setErr} = setData;

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newRecipe = {...recipe, recipeName: e.target.elements[0].value}
        const response = await fetchData({
            type: "PUT",
            url: `http://localhost:8080/api/recipes/${recipe.id}`,
            payload: newRecipe,
            setIsLoading: setLoad
        });

        
        if (response.id) {
            const recipeList = recipes.map((recipe) => recipe.id === response.id ? response : recipe);
            setRecs(recipeList);
        } else {
            setErr(response);
        }
        
        onClose();
    };

    return (
        <div className={`${styles.editRecipe} ${styles.modal}`}>
            <form className={styles.bookForm} onSubmit={handleSubmit}>
                <label htmlFor="recipe-name">Recipe Name: </label>
                <input type="text" id="recipe-name" placeholder="Recipe Name" defaultValue={recipe.recipeName} />
                <button type="submit">Submit</button>
            </form>
            <CloseButton onClose={onClose} />
        </div>
    );
}

function AddIngredientModal({onClose, data, setData}) {
    const {ingredients} = data;
    const {setIng, setLoad, setErr} = setData;

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newIngredient = {ingredientName: e.target.elements[0].value}
        const response = await fetchData({
            type: "POST",
            url: "http://localhost:8080/api/ingredients",
            payload: newIngredient,
            setIsLoading: setLoad
        });

        if (response.id) {
            setIng([...ingredients, response]);
        } else {
            setErr(response);
        }

        onClose();
    };

    return (
        <div className={`${styles.addIngr} ${styles.modal}`}>
            <form className={styles.ingrForm} onSubmit={handleSubmit}>
                <label htmlFor="ingr-name">Ingredient Name: </label>
                <input type="text" id="ingr-name" placeholder="New Ingredient" />
                <button type="submit">Submit</button>
            </form>
            <CloseButton onClose={onClose}  />
        </div>
    );
}

function EditIngredientModal({onClose, data, setData}) {
    const {ingredient, ingredients} = data;
    const {setIng, setLoad, setErr} = setData;

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newIngredient = {...ingredient, ingredientName: e.target.elements[0].value}
        const response = await fetchData({
            type: "PUT",
            url: `http://localhost:8080/api/ingredients/${ingredient.id}`,
            payload: newIngredient,
            setIsLoading: setLoad
        });

        const ingredientList = ingredients.map((item) => item.id === response.id ? response : item);

        if (response.id) {
            setIng(ingredientList);
        } else {
            setErr(response);
        }
        
        onClose();
    };

    return (
        <div className={`${styles.editIngr} ${styles.modal}`}>
            <form className={styles.ingrForm} onSubmit={handleSubmit}>
                <label htmlFor="ingr-name">Ingredient Name: </label>
                <input type="text" id="ingr-name" placeholder="Ingredient" defaultValue={ingredient.ingredientName} />
                <button type="submit">Submit</button>
            </form>
            <CloseButton onClose={onClose} />
        </div>
    );
}

function AddListModal({onClose, data, setData}) {
    const {lists} = data;
    const {setLists, setLoad, setErr} = setData;

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newList = {listName: e.target.elements[0].value}
        const response = await fetchData({
            type: "POST",
            url: "http://localhost:8080/api/shopping-lists",
            payload: newList,
            setIsLoading: setLoad
        });

        if (response.id) {
            setLists([...lists, response]);
        } else {
            setErr(response);
        }

        onClose();
    };
    return (
        <div className={`${styles.addList} ${styles.modal}`}>
            <form className={styles.listForm} onSubmit={handleSubmit}>
                <label htmlFor="list-name">List Name: </label>
                <input type="text" id="list-name" placeholder="List Name" />
                <button type="submit">Submit</button>
            </form>
            <CloseButton onClose={onClose} />
        </div>
    );
}

function EditListModal({onClose, data, setData}) {
    const {list, lists} = data;
    const {setLists, setLoad, setErr} = setData;

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newList = {...list, listName: e.target.elements[0].value}
        const response = await fetchData({
            type: "PUT",
            url: `http://localhost:8080/api/shopping-lists/${list.id}`,
            payload: newList,
            setIsLoading: setLoad
        });

        const listList = lists.map((item) => item.id === response.id ? response : item);

        if (response.id) {
            setLists(listList);
        } else {
            setErr(response);
        }
        
        onClose();
    };
    return (
        <div className={`${styles.editList} ${styles.modal}`}>
            <form className={styles.listForm} onSubmit={handleSubmit}>
                <label htmlFor="list-name">List Name: </label>
                <input type="text" id="list-name" placeholder="List Name" defaultValue={list.listName} />
                <button type="submit">Submit</button>
            </form>
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



function Modal({modalState, onClose, setData}) {
    const {modalType, data} = modalState;

    return createPortal(
        <ModalOverlay> 
            {modalType === "add-book" && <AddBookModal onClose={onClose} data={data} setData={setData} />}
            {modalType === "edit-book" && <EditBookModal onClose={onClose} data={data} setData={setData} />}
            {modalType === "add-rec" && <AddRecipeModal onClose={onClose} data={data} setData={setData} />}
            {modalType === "edit-rec" && <EditRecipeModal onClose={onClose} data={data} setData={setData} />}
            {modalType === "add-ingr" && <AddIngredientModal onClose={onClose} data={data} setData={setData} />}
            {modalType === "edit-ingr" && <EditIngredientModal onClose={onClose} data={data} setData={setData} />}
            {modalType === "add-list" && <AddListModal onClose={onClose} data={data} setData={setData} />}
            {modalType === "edit-list" && <EditListModal onClose={onClose} data={data} setData={setData} />}
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