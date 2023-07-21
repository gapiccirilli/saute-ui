import styles from "./PageStyles/HomePage.module.css";

function LoginPage({style}) {
    return (
        <div className={styles.logIn} style={{display: style.display, opacity: style.opacity}}>
            Login
        </div>
    );
}

export default LoginPage;