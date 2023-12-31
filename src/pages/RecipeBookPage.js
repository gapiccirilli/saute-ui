import styles from "./Page.module.css";
import RecipeBookCard from "../components/Cards/RecipeBookCard";
import AddButton from "../components/Buttons/AddButton";
import ErrorMessage from "../components/Error/ErrorMessage";
import { useState } from "react";
import { useModal } from "../hooks/useModal";
import Modal from "../components/Modals/Modal";
import Load from "../loaders/Load";
import { useFetch } from "../hooks/useFetch";
import { useScrollIntoView } from "../hooks/useScrollIntoView";
import { useRecipeBooks } from "../hooks/useRecipeBooks";
import { useSelector } from "react-redux";

function RecipeBookPage() {
    const {bookState, dispatchers} = useRecipeBooks();
    const {recipeBooks, error} = bookState;
    const {setRecipeBooks, setError, setRecipeBooksAndError} = dispatchers;
    const [modalState, dispatch] = useModal();
    const [isLoading, setIsLoading] = useState(false);

    // useScrollIntoView("#app-nav", {block: "start", behavior: "smooth"});
    useFetch("http://localhost:8080/api/recipe-books", {setData: setRecipeBooks, setErr: setError, setLoad: setIsLoading});

    const handleAddBook = () => {
        dispatch({type: "add-book", payload: {recipeBooks: recipeBooks}});
    };

    const handleEditBook = (book) => {
        dispatch({type: "edit-book", payload: {recipeBook: book, recipeBooks: recipeBooks}});
    };

    const handleBookDelete = (bookId) => {
        if (recipeBooks.length === 1) {
            setRecipeBooksAndError(recipeBooks.filter((book) => book.id !== bookId), "No recipe books found");
        } else {
            setRecipeBooks(recipeBooks.filter((book) => book.id !== bookId));
        }
    };

    const handleCloseModal = () => {
        dispatch({ type: "close" });
    };

    const setters = {
        setBooks: setRecipeBooks,
        setErr: setError,
        setBooksAndErr: setRecipeBooksAndError
    };

    return (
        <div id="recipe-books" className={styles.page}>
            {isLoading && <Load />}
            {modalState.isOpen && <Modal modalState={modalState} onClose={handleCloseModal} setData={setters} />}
            {!error && !isLoading && <nav className={styles.gridNav}>
                <AddButton className="button-site-theme flex-add" onAdd={handleAddBook}>Add Recipe Book</AddButton>
                </nav>}
            {!error && <div className={styles.gridContent}>
                {recipeBooks.map((book) => <RecipeBookCard recipeBook={book} key={book.id} onDeleteBook={handleBookDelete}
            onEditIngredient={handleEditBook}/>)}
                    </div>}
            {error && <ErrorMessage message={error}/>}
        </div>
    );
}

export default RecipeBookPage;