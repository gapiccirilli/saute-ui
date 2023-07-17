import styles from "./Load.module.css";

function Load() {
    return (
        <div className={styles.loadOverlay}>
            <p className={styles.icon}>Loading...</p>
        </div>
    );
}

export default Load;