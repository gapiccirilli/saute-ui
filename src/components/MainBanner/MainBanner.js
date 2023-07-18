import styles from "./MainBanner.module.css";
import Logo from "../Logo/Logo";


function MainBanner() {
    return (
        <div className={styles.banner}>
            <Logo className="banner-logo" />
        </div>
    );
}

export default MainBanner;