import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header";


function AppLayout() {
    return (
        <div className="content">
            <Header />
            <Outlet />
        </div>
    );
}

export default AppLayout;