import AccountButton from "../AccountButton/AccountButton";
import styles from "./AccountNav.module.css";
import Logo from "../Logo/Logo";


function AccountNav() {
    return (
        <nav className={styles.nav}>
            <div className={styles.navLeft}>
                <Logo />
            </div>
            <div className={styles.navRight}>
                <ul className={styles.acctList}>
                    <li className={styles.actBtn}>
                        <AccountButton />
                    </li>
                    <li>
                        <button>Logout</button>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default AccountNav;