import Card from "./Card";

function RecipeBookCard({ recipeBook }) {
    const {recipeBookName} = recipeBook;
    
    return (
        <Card>
            <p>{recipeBookName}</p>
        </Card>
    );
}

export default RecipeBookCard;