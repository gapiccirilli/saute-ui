import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import RecipeCard from "../components/Cards/RecipeCard";
import AddNewCard from "../components/Cards/AddNewCard";

function RecipePage() {
    const { id } = useParams();
    const [recipes, setRecipes] = useState([]);
    const [exception, setException] = useState({});
    const [error, setError] = useState("");

    useEffect(() => {
        async function getRecipes() {
            try {
                const response = await fetch(`http://localhost:8080/api/recipe-books/${id}/recipes`);

                if (!response.ok) {
                    throw new Error()
                }

                const data = await response.json();
                if (data.id === undefined) {
                    setRecipes(data);
                }
                else {
                    setException(data);
                }
            } catch(err) {
                console.error(err);
                setError(err.message);
            }
        }
        getRecipes();
    }, []);

    const dummyRecipes = [
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
    // const filteredRecipes = dummyRecipes.filter((recipe) => recipe.recipeBookId == id);

    return (
        <div>
            {/* use in production */}
            {recipes.map((recipe) => <RecipeCard recipe={recipe} key={recipe.id} />)}

            {/* for testing only below. Delete when implementing fetching */}
            {/* {filteredRecipes.map((recipe) => <RecipeCard recipe={recipe} key={recipe.id} />)} */}
            <AddNewCard>Recipe</AddNewCard>
        </div>
    );
}

export default RecipePage;