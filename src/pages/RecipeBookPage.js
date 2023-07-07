import RecipeBookCard from "../components/Cards/RecipeBookCard";
import AddNewCard from "../components/Cards/AddNewCard";
import ErrorMessage from "../components/Error/ErrorMessage";
import { useEffect, useState } from "react";

function RecipeBookPage() {
    const [recipeBooks, setRecipeBooks] = useState([]);
    const [error, setError] = useState("");

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

    return (
        <div>
            {/* {dummyRecipeBooks.map((book) => <RecipeBookCard recipeBook={book} key={book.id} />)} */}
            {!error && recipeBooks.map((book) => <RecipeBookCard recipeBook={book} key={book.id} />)}
            {!error && <AddNewCard>Recipe Book</AddNewCard>}
            {error && <ErrorMessage message={error}/>}
        </div>
    );
}

export default RecipeBookPage;