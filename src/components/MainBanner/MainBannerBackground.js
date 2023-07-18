import { Fragment } from "react";
import styles from "./MainBannerBackground.module.css";
import bannerImg from "../../assets/banner-img.jpg";

function MainBannerBackground({children}) {
    return (
        <div className={styles.bgContainer}>
            <img src={bannerImg} alt="Banner" className={styles.bgImg} />
            {children}
        </div>
    );
}

export default MainBannerBackground;