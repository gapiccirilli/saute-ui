import { Fragment } from "react";
import AccountNav from "../AccountNav/AccountNav";
import AppNav from "../AppNav/AppNav";
import MainBanner from "../MainBanner/MainBanner";


function Header() {
    return (
        <Fragment>
            <AccountNav />
            <MainBanner />
            <AppNav />
        </Fragment>
    );
}

export default Header;