import { useDispatch, useSelector } from "react-redux";
import styles from "./PageStyles/HomePage.module.css";
import { createAuthFail, create } from "../slices/userSlice";
import Load from "../loaders/Load";

function CreateUserPage({style, navigate}) {
    const dispatch = useDispatch();

    const { createAuthError, isLoading } = useSelector(store => store.user);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (e.target.elements[4].value === e.target.elements[5].value) {
            const user = {
                firstName: e.target.elements[0].value,
                lastName: e.target.elements[1].value,
                email: e.target.elements[2].value,
                password: e.target.elements[4].value,
                phoneNumber: e.target.elements[3].value,
            };
            dispatch(await create(user));
            if (!createAuthError) {
                navigate({
                    logInStyle: {display: "flex"},
                    createStyle: {display: "none"}
                });
                for (const element of e.target.elements) {
                    element.value = "";
                }
            }
        } else {
            dispatch(createAuthFail("Passwords must match!"));
        }
    };

    return (
        <div className={styles.create} style={{display: style.display}}>
            {!isLoading && <form className={styles.form} onSubmit={handleSubmit} >
                <h2>Create Account</h2>
                <p className={styles.error}>{createAuthError}</p>
                <div className={styles.inputContainer}>
                    <div className={styles.name}>
                        <input className={styles.first} type="text"  placeholder="First Name" required />
                        <input className={styles.last} type="text"  placeholder="Last Name" required />
                    </div>
                    <input className={styles.email} type="email"  placeholder="Email" required />
                    <input className={styles.number} type="text"  placeholder="Phone Number" required />
                    <input className={styles.createPass} type="password"  placeholder="Create Password" required />
                    <input className={styles.repeatPass} type="password"  placeholder="Repeat Password" required />
                </div>
                <div>
                    <button className="button-site-theme" type="submit">Create Account</button>
                </div>
            </form>}
            {isLoading && <Load />}
        </div>
    );
}

export default CreateUserPage;