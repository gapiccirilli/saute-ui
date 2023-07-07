import Card from "./Card";

function RecipeBookCard({ recipeBookName }) {
    return (
        <Card>
            <p>{recipeBookName}</p>
        </Card>
    );
}

export default RecipeBookCard;