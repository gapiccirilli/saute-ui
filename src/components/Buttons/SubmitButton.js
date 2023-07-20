import styles from "./SubmitButton.module.css";

function SubmitButton({onSubmit, className}) {
    const classes = `${styles.button} ${className}`;
    return (
        <button className={classes} onSubmit={onSubmit}>
           Submit
        </button>
    );
}

export default SubmitButton;