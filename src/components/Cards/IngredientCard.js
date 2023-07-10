import Card from "./Card";
import styles from "./IngredientCard.module.css";

function IngredientCard({ ingredient }) {
    const { ingredientName, numberOfRecipes } = ingredient;
    
    return (
        <Card>
            <div className={styles.cardImg}>

            </div>
            <div className={styles.cardDesc}>
                <p className={styles.name}>{ingredientName}</p>
                <p className={styles.recipeNums}>{numberOfRecipes}</p>
            </div>
        </Card>
    );
}

export default IngredientCard;