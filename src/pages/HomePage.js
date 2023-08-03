import Logo from "../components/Logo/Logo";
import bgImg from "../assets/home-bg.jpg";
import styles from "./PageStyles/HomePage.module.css";
import { Link, useNavigate } from "react-router-dom";
import LoginPage from "./LoginPage";
import { useState } from "react";
import CreateUserPage from "./CreateUserPage";
import { useRedirect } from "../hooks/useRedirect";
import { useSelector } from "react-redux";

function HomePage() {
    const navigate = useNavigate();
    const createClasses = `${styles.createBtn} button-site-theme`;
    const logInClasses = `${styles.logInBtn} button-site-theme`;
    const [style, setStyle] = useState({
        createStyle: {display:"none"},
        logInStyle: {display:"none"}
    });

    const isAuthenticated = useSelector(store => store.user.isAuthenticated);
    if (isAuthenticated) {
        navigate("saute");
    }

    const {createStyle, logInStyle} = style;

    const handleOpenLogin = () => {
        setStyle({...style,
            logInStyle: {display: "flex"},
            createStyle: {display: "none"}
        });
    };

    const handleOpenCreateUser = () => {
        setStyle({...style,
            createStyle: {display: "flex"},
            logInStyle: {display: "none"}
        });
    };

    return (
        <div className={styles.home}>
            <nav className={styles.nav}>
                <ul className={styles.btns}>
                    <li><button onClick={handleOpenCreateUser} className={createClasses}>Create Account</button></li>
                    <li><button onClick={handleOpenLogin} className={logInClasses}>Login</button></li>
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
                <CreateUserPage style={createStyle} navigate={setStyle} />
            </main>
            <footer className={styles.footer}>
            </footer>
        </div>
    );
}

export default HomePage;