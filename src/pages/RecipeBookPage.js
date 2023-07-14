import RecipeBookCard from "../components/Cards/RecipeBookCard";
import AddNewCard from "../components/Cards/AddNewCard";
import ErrorMessage from "../components/Error/ErrorMessage";
import { useEffect, useState } from "react";
import { useModal } from "../hooks/useModal";
import Modal from "../components/Modals/Modal";

function RecipeBookPage() {
    const [recipeBooks, setRecipeBooks] = useState([]);
    const [error, setError] = useState("");
    const [modalState, events] = useModal();

    useEffect(() => {
        async function getRecipeBooks() {
            try {
                const response = await fetch("http://localhost:8080/api/recipe-books");

            if (!response.ok) {
                const errorMessage = await response.json();
                throw new Error(errorMessage.message);
            }

            const data = await response.json();

            setRecipeBooks(data);
            } catch(err) {
                const {message} = err;
                setError(message);
            }
        }
        getRecipeBooks();
    }, [])

    const handleAddBook = () => {
        events.add("add-book");
    };

    const handleEditBook = (book) => {
        events.edit("edit-book", book);
    };

    const handleBookDelete = (bookId) => {
        setRecipeBooks((prev) => {
            return prev.filter((book) => book.id !== bookId);
        });
    };

    const handleCloseModal = () => {
        events.close();
    };

    return (
        <div>
            {modalState.isOpen && <Modal modalState={modalState} onClose={handleCloseModal} />}
            {!error && recipeBooks.map((book) => <RecipeBookCard recipeBook={book} key={book.id} onDeleteBook={handleBookDelete}
            onEditIngredient={handleEditBook}/>)}
            {!error && <AddNewCard onAdd={handleAddBook}>Recipe Book</AddNewCard>}
            {error && <ErrorMessage message={error}/>}
        </div>
    );
}

export default RecipeBookPage;