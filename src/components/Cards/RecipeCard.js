import { Link } from "react-router-dom";
import styles from "./RecipeCard.module.css";
import Card from "./Card";

function RecipeCard({ recipe }) {
    const {id, recipeName, description} = recipe;
    const url = `recipes/${id}?name=${recipeName}&desc=${description}`;

    return (
        <Card>
            <Link to={url}>
            <div className={styles.cardImg}>

            </div>
            <div className={styles.cardDesc}>
                <p className={styles.title}>{recipeName}</p>
                <p className={styles.desc}>{description}</p>
            </div>
            </Link>
        </Card>
    );
}

export default RecipeCard;