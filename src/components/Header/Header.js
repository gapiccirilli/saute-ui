import { Fragment } from "react";
import AccountNav from "../AccountNav/AccountNav";
import AppNav from "../AppNav/AppNav";
import MainBanner from "../MainBanner/MainBanner";
import MainBannerBackground from "../MainBanner/MainBannerBackground";


function Header() {
    return (
        <Fragment>
            <AccountNav />
            <MainBannerBackground>
                <MainBanner />
            </MainBannerBackground>
            <AppNav />
        </Fragment>
    );
}

export default Header;