import styles from "./RecipeBookCard.module.css";
import Card from "./Card";
import { Link } from "react-router-dom";

function RecipeBookCard({ recipeBook }) {
    const {id, recipeBookName} = recipeBook;
    
    return (
        <Card>
            <Link to={`${id}`}>
                <div className={styles.cardImg}>

                </div>
                <div className={styles.cardDesc}>
                    <p>{recipeBookName}</p>
                </div>
            </Link>
        </Card>
    );
}

export default RecipeBookCard;