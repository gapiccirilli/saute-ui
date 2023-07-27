import styles from "./Load.module.css";

function SearchLoad() {
    return (
        <div className={styles.loadOverlaySearch}>
            <p className={styles.icon}>Loading...</p>
        </div>
    );
}

export default SearchLoad;