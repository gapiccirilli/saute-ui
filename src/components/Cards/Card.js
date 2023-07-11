import styles from "./Card.module.css";

function Card({ children, showButtons }) {
    return (
        <div className={styles.card}>
            {showButtons && <div className={styles.cardBtns}>
                <span className={styles.edit}>&#9998;</span>
                <span className={styles.delete}>X</span>
            </div>}
            {children}
        </div>
    );
}

export default Card;