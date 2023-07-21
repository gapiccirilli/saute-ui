import styles from "./LoginButton.module.css";

function LoginButton({children, className}) {
    const classes = `${styles.button} ${className}`;
    return (
        <button className={classes}>
           {children}
        </button>
    );
}

export default LoginButton;