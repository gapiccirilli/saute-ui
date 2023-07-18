import styles from "./Logo.module.css";
import logo from "../../assets/saute-logo.png";

function Logo({className}) {
    return (
        <img className={className} src={logo} alt="saute-logo" />
    );
}

export default Logo;