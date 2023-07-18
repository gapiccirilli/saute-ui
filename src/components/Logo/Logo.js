import styles from "./Logo.module.css";
import logo from "../../assets/saute-logo.png";
import altLogo from "../../assets/saute-logo-white.png";
import { Fragment } from "react";

function Logo({className, color}) {
    const colorComp = color.toLowerCase();

    return (
        <Fragment>
            {colorComp === "black" && <img className={className} src={logo} alt="saute-logo" />}
            {colorComp === "white" && <img className={className} src={altLogo} alt="saute-logo-white" />}
        </Fragment>
    );
}

export default Logo;