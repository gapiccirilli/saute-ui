import AccountButton from "../AccountButton/AccountButton";
import styles from "./AccountNav.module.css";
import LogoutButton from "../Buttons/LogoutButton";
import profile from "../../assets/profile-pic.jpg";
import Logo from "../Logo/Logo";
import SearchBar from "../SearchBar.js/SearchBar";


function AccountNav() {
    return (
        <nav className={styles.nav}>
            <div className={styles.navLeft}>
                <Logo className="act-nav-logo" color="white"/>
                <SearchBar />
            </div>
            <div className={styles.navRight}>
                <ul className={styles.acctList}>
                    <li className={styles.actBtn}>
                        <AccountButton className="button-site-theme">
                            <img className={styles.profilePic} src={profile} alt="Gino" />
                            <p className={styles.name}>Gino</p>
                        </AccountButton>
                    </li>
                    <li>
                        <LogoutButton className="button-site-theme">Logout</LogoutButton>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default AccountNav;