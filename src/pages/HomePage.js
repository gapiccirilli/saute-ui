import Logo from "../components/Logo/Logo";
import bgImg from "../assets/home-bg.jpg";
import styles from "./PageStyles/HomePage.module.css";
import { Link } from "react-router-dom";
import LoginPage from "./LoginPage";
import { useState } from "react";

function HomePage() {
    const createClasses = `${styles.createBtn} button-site-theme`;
    const logInClasses = `${styles.logInBtn} button-site-theme`;
    const [style, setStyle] = useState({
        defaultStyle: {display:"flex"},
        createStyle: {display:"none"},
        logInStyle: {display:"none"}
    });
    const {defaultStyle, createStyle, logInStyle} = style;

    const handleOpenLogin = () => {
        setStyle({...style,
        logInStyle: {display: "flex"}});
    };

    return (
        <div className={styles.home}>
            <nav className={styles.nav}>
                <ul className={styles.btns}>
                    <li><button className={createClasses}>Create Account</button></li>
                    <li><button onClick={handleOpenLogin} className={logInClasses}>Log in</button></li>
                </ul>
            </nav>
            <header className={styles.header}>
            </header>
            <main className={styles.content}>
                <img className={styles.bg} src={bgImg} alt="banner" />
                <div className={styles.default}>
                <Logo className="home-logo" color="black" />
                    <section>
                        <h3 className={styles.contentTitle}>The perfect home for your recipes</h3>
                        <p className={styles.contentBody}>Create recipe books and shopping lists on the go</p>
                    </section>
                </div>
                <LoginPage style={logInStyle} />
            </main>
            <footer className={styles.footer}>
                <Link to="saute">GO TO APP</Link>
            </footer>
        </div>
    );
}

export default HomePage;