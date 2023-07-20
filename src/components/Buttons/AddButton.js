import styles from "./AddButton.module.css";

function AddButton({children, className, onAdd}) {
    const classes = `${styles.button} ${className}`;
    return (
        <button className={classes} onClick={onAdd}>
           {children}
        </button>
    );
}

export default AddButton;