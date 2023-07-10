import styles from "./Logo.module.css";
import logo from "../../assets/saute-logo.png";

function Logo() {
    return (
        <img className={styles.logo} src={logo} alt="saute-logo" width="50" height="50"/>
    );
}

export default Logo;