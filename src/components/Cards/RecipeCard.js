import { Link } from "react-router-dom";
import Card from "./Card";

function RecipeCard({ recipe }) {
    const {id, recipeName, description} = recipe;
    const url = `recipes/${id}?name=${recipeName}&desc=${description}`;

    return (
        <Link to={url}>
            <Card>
                <p>{recipeName}</p>
                <p>{description}</p>
            </Card>
        </Link>
    );
}

export default RecipeCard;