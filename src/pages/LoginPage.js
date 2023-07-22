import styles from "./PageStyles/HomePage.module.css";

function LoginPage({style}) {
    return (
        <div className={styles.logIn} style={{display: style.display}}>
            <form className={styles.form} >
                <h2>Login</h2>
                <div>
                    <input className={styles.user} type="text"  placeholder="Username or Email" />
                    <input className={styles.pass} type="password"  placeholder="Password" />
                </div>
                <div>
                    <button className="button-site-theme" type="submit">Login</button>
                </div>
            </form>
        </div>
    );
}

export default LoginPage;