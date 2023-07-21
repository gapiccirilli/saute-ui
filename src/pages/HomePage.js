import Logo from "../components/Logo/Logo";
import styles from "./PageStyles/HomePage.module.css";
import { Link } from "react-router-dom";

function HomePage() {
    return (
        <div className={styles.home}>
            <nav className={styles.nav}>
                <ul className={styles.btns}>
                    <li><button className="button-site-theme">Create Account</button></li>
                    <li><button className="button-site-theme">Log in</button></li>
                </ul>
            </nav>
            <header className={styles.header}>
            </header>
            <main className={styles.content}>
                <Logo className="home-logo" color="black" />
                <section>
                    <h3 className={styles.contentTitle}>The perfect home for your recipes</h3>
                    <p className={styles.contentBody}>Create recipe books and shopping lists on the go</p>
                </section>
            </main>
            <footer className={styles.footer}>
                <Link to="saute">GO TO APP</Link>
            </footer>
        </div>
    );
}

export default HomePage;