import Card from "./Card";

function IngredientCard({ ingredientName, numberOfRecipes }) {
    return (
        <Card>
            <p>{ingredientName}</p>
            <p>{numberOfRecipes}</p>
        </Card>
    );
}

export default IngredientCard;