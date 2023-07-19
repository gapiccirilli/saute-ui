import styles from "./Page.module.css";
import RecipeBookCard from "../components/Cards/RecipeBookCard";
import AddNewCard from "../components/Cards/AddNewCard";
import ErrorMessage from "../components/Error/ErrorMessage";
import { useEffect, useState } from "react";
import { useModal } from "../hooks/useModal";
import Modal from "../components/Modals/Modal";
import Load from "../loaders/Load";
import { useFetch } from "../hooks/useFetch";

import { testRecipeBooks } from "../test-data/Data";

function RecipeBookPage() {
    const [recipeBooks, setRecipeBooks] = useState([]);
    const [error, setError] = useState("");
    const [modalState, dispatch] = useModal();
    const [isLoading, setIsLoading] = useState(false);

    // useFetch("http://localhost:8080/api/recipe-books", {setData: setRecipeBooks, setErr: setError, setLoad: setIsLoading});

    const handleAddBook = () => {
        dispatch({type: "add-book", payload: {recipeBooks: recipeBooks}});
    };

    const handleEditBook = (book) => {
        dispatch({type: "edit-book", payload: {recipeBook: book, recipeBooks: recipeBooks}});
    };

    const handleBookDelete = (bookId) => {
        setRecipeBooks((prev) => {
            return prev.filter((book) => book.id !== bookId);
        });
    };

    const handleCloseModal = () => {
        dispatch({ type: "close" });
    };

    const setters = {
        setBooks: setRecipeBooks,
        setLoad: setIsLoading,
        setErr: setError
    };

    return (
        <div className={styles.page}>
            {isLoading && <Load />}
            {modalState.isOpen && <Modal modalState={modalState} onClose={handleCloseModal} setData={setters} />}
            {!error && testRecipeBooks.map((book) => <RecipeBookCard recipeBook={book} key={book.id} onDeleteBook={handleBookDelete}
            onEditIngredient={handleEditBook}/>)}
            {/* {!error && !isLoading && <AddNewCard onAdd={handleAddBook}>Recipe Book</AddNewCard>} */}
            {error && <ErrorMessage message={error}/>}
        </div>
    );
}

export default RecipeBookPage;