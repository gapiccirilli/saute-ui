import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


export function useLogout(url="/") {
    const isAuthenticated = useSelector(store => store.user.isAuthenticated);
    const navigate = useNavigate();

    if (!isAuthenticated) {
        localStorage.removeItem("auth");
        navigate(url);
    }
}