import { useParams } from "react-router-dom";
import RecipeCard from "../components/Cards/RecipeCard";

function RecipePage() {
    const { id } = useParams();

    const recipes = [
        {
            id: 1,
            recipeName: "Brownies",
            description: "Yummy Brownies",
            recipeBookId: 2
        },
        {
            id: 2,
            recipeName: "Banana Bread",
            description: "Yummy Banana Bread",
            recipeBookId: 3
        },
        {
            id: 3,
            recipeName: "Tirimesu",
            description: "Yummy Tirimesu",
            recipeBookId: 1
        },
        {
            id: 4,
            recipeName: "Lasagna",
            description: "Yummy Lasagna",
            recipeBookId: 4
        },
        {
            id: 5,
            recipeName: "Spinach Ravioli",
            description: "Yummy Spinach Ravioli",
            recipeBookId: 1
        }
    ];

    {/* for testing only below. Delete when implementing fetching */}
    const filteredRecipes = recipes.filter((recipe) => recipe.recipeBookId == id);

    return (
        <div>
            {/* use in production {recipes.map((recipe) => <RecipeCard recipe={recipe} key={recipe.id} />)} */}

            {/* for testing only below. Delete when implementing fetching */}
            {filteredRecipes.map((recipe) => <RecipeCard recipe={recipe} key={recipe.id} />)}
        </div>
    );
}

export default RecipePage;