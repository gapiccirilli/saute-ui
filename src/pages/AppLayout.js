import { Outlet } from "react-router-dom";
import AppNav from "../components/AppNav/AppNav";


function AppLayout() {
    return (
        <div>
            <h1>Home</h1>
            <AppNav />
            {/* outlet is specifically for child routes and acts just like children in props */}
            <Outlet />
        </div>
    );
}

export default AppLayout;