import Card from "./Card";

function IngredientCard({ ingredient }) {
    const { ingredientName, numberOfRecipes } = ingredient;
    
    return (
        <Card>
            <p>{ingredientName}</p>
            <p>{numberOfRecipes}</p>
        </Card>
    );
}

export default IngredientCard;