import styles from "./SearchBar.module.css";
import DropDown from "../SearchBar.js/DropDown";

function SearchBar() {
    return (
            <form className={styles.form}>
                <input className={styles.search} type="text" id="query" name="query" placeholder="Search" />
                <DropDown />
            </form>
    );
}

export default SearchBar;