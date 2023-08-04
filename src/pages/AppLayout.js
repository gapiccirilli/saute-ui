import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header";
import { Fragment } from "react";
import { useLogout } from "../hooks/useLogout";


function AppLayout() {
    useLogout();
    
    return (
        <Fragment>
            <Header />
            <Outlet />
        </Fragment>
    );
}

export default AppLayout;