import { Fragment } from "react";
import styles from "./Header.module.css";
import AccountNav from "../AccountNav/AccountNav";
import AppNav from "../AppNav/AppNav";
import MainBanner from "../MainBanner/MainBanner";
import MainBannerBackground from "../MainBanner/MainBannerBackground";


function Header() {
    return (
        <div className={styles.header}>
            <AccountNav />
            <MainBannerBackground>
                <MainBanner />
            </MainBannerBackground>
            <AppNav />
        </div>
    );
}

export default Header;