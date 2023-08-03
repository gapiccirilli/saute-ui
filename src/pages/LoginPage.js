import { useDispatch, useSelector } from "react-redux";
import { login } from "../slices/userSlice";
import styles from "./PageStyles/HomePage.module.css";
import Load from "../loaders/Load";


function LoginPage({style}) {
    const { loginAuthError, isLoading } = useSelector(store => store.user);
    const dispatch = useDispatch();

    const handleLogin = async (e) => {
        e.preventDefault();
        dispatch(await login(e.target.elements[0].value, e.target.elements[1].value));

        if (!loginAuthError) {
            for (const element of e.target.elements) {
                element.value = "";
            }
        }
    };

    return (
        <div className={styles.logIn} style={{display: style.display}}>
            {!isLoading && <form className={styles.form} onSubmit={handleLogin} >
                <h2>Login</h2>
                <p className={styles.loginError}>{loginAuthError}</p>
                <div>
                    <input className={styles.user} type="text"  placeholder="Username or Email" />
                    <input className={styles.pass} type="password"  placeholder="Password" />
                </div>
                <div>
                    <button className="button-site-theme" type="submit">Login</button>
                </div>
            </form>}
            {isLoading && <Load />}
        </div>
    );
}

export default LoginPage;