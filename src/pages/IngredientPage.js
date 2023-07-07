import IngredientCard from "../components/Cards/IngredientCard";


function IngredientPage() {

    const ingredients = [
        {
            id: 1,
            ingredientName: "Tomato",
            numberOfRecipes: "3"
        },
        {
            id: 2,
            ingredientName: "Mozzarella",
            numberOfRecipes: "1"
        },
        {
            id: 3,
            ingredientName: "Red Bell Pepper",
            numberOfRecipes: "4"
        }
    ];

    return (
        <div>
            {ingredients.map((ingredient) => <IngredientCard ingredient={ingredient} key={ingredient.id} />)}
        </div>
    );
}

export default IngredientPage;