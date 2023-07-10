import styles from "./Card.module.css";

function Card({ children }) {
    return (
        <div className={styles.card}>
            <div className={styles.cardBtns}>
                <span className={styles.edit}>Edit</span>
                <span className={styles.delete}>X</span>
            </div>
            {children}
        </div>
    );
}

export default Card;