import Card from "./Card";
import styles from "./ShoppingListCard.module.css";

function ShoppingListCard({ list }) {
    const { listName } = list;
    
    return (
        <Card showButtons={true}>
            <div className={styles.cardImg}>

            </div>
            <div className={styles.cardDesc}>
                <p className={styles.title}>{listName}</p>
            </div>
        </Card>
    );
}

export default ShoppingListCard;