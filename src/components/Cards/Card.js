import styles from "./Card.module.css";

function Card({ children, showButtons, onEdit, onDelete }) {
    return (
        <div className={styles.card}>
            {showButtons && <div className={styles.cardBtns}>
                <span className={styles.edit} onClick={onEdit}>&#9998;</span>
                <span className={styles.delete} onClick={onDelete}>X</span>
            </div>}
            {children}
        </div>
    );
}

export default Card;