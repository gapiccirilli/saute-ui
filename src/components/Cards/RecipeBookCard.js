import Card from "./Card";
import { Link } from "react-router-dom";

function RecipeBookCard({ recipeBook }) {
    const {id, recipeBookName} = recipeBook;
    
    return (
        <Link to={`${id}`}>
            <Card>
                <p>{recipeBookName}</p>
            </Card>
        </Link>
    );
}

export default RecipeBookCard;