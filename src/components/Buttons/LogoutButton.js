import styles from "./LogoutButton.module.css";

function LogoutButton({children, className}) {
    const classes = `${styles.button} ${className}`;
    return (
        <button className={classes}>
           {children}
        </button>
    );
}

export default LogoutButton;