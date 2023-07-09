import styles from "./Logo.module.css";

function Logo() {
    return (
        <img className={styles.logo} src="saute-logo.png" alt="saute-logo" width="50" height="50"/>
    );
}

export default Logo;