import RecipeBookCard from "../components/Cards/RecipeBookCard";
import AddNewCard from "../components/Cards/AddNewCard";

function RecipeBookPage() {

    const recipeBooks = [
        {
            id: 1,
            recipeBookName: "Healthy Recipes"
        },
        {
            id: 2,
            recipeBookName: "Tasty Recipes"
        },
        {
            id: 3,
            recipeBookName: "Desserts"
        },
        {
            id: 4,
            recipeBookName: "Italian Recipes"
        },
        {
            id: 5,
            recipeBookName: "Vegetarian Recipes"
        }
    ];

    return (
        <div>
            {recipeBooks.map((book) => <RecipeBookCard recipeBook={book} key={book.id} />)}
            <AddNewCard>Recipe Book</AddNewCard>
        </div>
    );
}

export default RecipeBookPage;