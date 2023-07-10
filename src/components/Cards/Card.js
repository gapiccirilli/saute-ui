import styles from "./Card.module.css";

function Card({ children }) {
    return (
        <div className={styles.card}>
            <div className={styles.cardBtns}>
                <span>Edit</span>
                <span>X</span>
            </div>
            {children}
        </div>
    );
}

export default Card;