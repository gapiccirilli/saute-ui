import { Link } from "react-router-dom";

function AppNav() {
    return (
        <nav>
            <ul>
                <li>
                    <Link to="books">Recipe Books</Link>
                </li>
                <li>
                    <Link to="ingredients">Ingredients</Link>
                </li>
                <li>
                    <Link to="lists">Shopping Lists</Link>
                </li>
            </ul>
        </nav>
    );
}

export default AppNav;