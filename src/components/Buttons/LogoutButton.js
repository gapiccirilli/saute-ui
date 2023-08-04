import { useDispatch } from "react-redux";
import styles from "./LogoutButton.module.css";
import { logout } from "../../slices/userSlice";

function LogoutButton({children, className}) {
    const classes = `${styles.button} ${className}`;
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
    };

    return (
        <button className={classes} onClick={handleLogout}>
           {children}
        </button>
    );
}

export default LogoutButton;