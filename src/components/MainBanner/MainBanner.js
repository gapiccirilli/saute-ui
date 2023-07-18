import styles from "./MainBanner.module.css";
import Logo from "../Logo/Logo";


function MainBanner() {
    return (
        <div className={styles.banner}>
            <Logo className="banner-logo" color="black" />
        </div>
    );
}

export default MainBanner;