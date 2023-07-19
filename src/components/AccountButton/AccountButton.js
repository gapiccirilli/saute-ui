import styles from "./AccountButton.module.css";

function AccountButton({children, className}) {
    const classes = `${styles.button} ${className}`;
    
    return (
        <button className={classes}>
            {children}
        </button>
        );
}

export default AccountButton;