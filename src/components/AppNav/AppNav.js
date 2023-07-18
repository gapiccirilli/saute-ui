import styles from "./AppNav.module.css";
import { NavLink } from "react-router-dom";

function AppNav() {
    return (
        <nav className={styles.nav}>
            <ul className={styles.appList}>
                <NavLink to="books"><li>Recipe Books</li></NavLink>
                <NavLink to="ingredients"><li>Ingredients</li></NavLink>
                <NavLink to="lists"><li>Shopping Lists</li></NavLink>
            </ul>
        </nav>
    );
}

export default AppNav;