import styles from "./SearchBar.module.css";

function SearchBar() {
    return (
        <form className={styles.form}>
            <input className={styles.search} type="text" id="query" name="query" placeholder="Search" />
        </form>
    );
}

export default SearchBar;