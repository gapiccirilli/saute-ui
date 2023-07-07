import Card from "./Card";

function RecipeCard({ recipe }) {
    const {recipeName, description} = recipe;
    
    return (
        <Card>
            <p>{recipeName}</p>
            <p>{description}</p>
        </Card>
    );
}

export default RecipeCard;