import styles from "./RecipeBookCard.module.css";
import Card from "./Card";
import { Link } from "react-router-dom";

function RecipeBookCard({ recipeBook }) {
    const {id, recipeBookName} = recipeBook;
    
    return (
        <Link to={`${id}`}>
            <Card>
                <div className={styles.cardImg}>

                </div>
                <div className={styles.cardDesc}>
                    <p>{recipeBookName}</p>
                </div>
            </Card>
        </Link>
    );
}

export default RecipeBookCard;