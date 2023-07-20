import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header";
import { Fragment } from "react";


function AppLayout() {
    return (
        <Fragment>
            <Header />
            <Outlet />
        </Fragment>
    );
}

export default AppLayout;