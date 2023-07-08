import AccountButton from "../AccountButton/AccountButton";
import styles from "./AccountNav.module.css";
import Logo from "../Logo/Logo";


function AccountNav() {
    return (
        <nav className={styles.nav}>
            <div className={styles.logoNav}>
                <Logo />
            </div>
            <div className={styles.acctNav}>
                <ul className={styles.acctList}>
                    <li className={styles.actBtn}>
                        <AccountButton />
                    </li>
                    <li className={styles.logOut}>
                        <button>Logout</button>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default AccountNav;