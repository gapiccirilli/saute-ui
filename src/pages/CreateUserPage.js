import styles from "./PageStyles/HomePage.module.css";

function CreateUserPage({style}) {
    return (
        <div className={styles.create} style={{display: style.display}}>
            <form className={styles.form} >
                <h2>Create Account</h2>
                <div>
                    <input className={styles.email} type="email"  placeholder="Email" />
                    <input className={styles.number} type="text"  placeholder="Phone Number" />
                    <input className={styles.createPass} type="password"  placeholder="Create Password" />
                    <input className={styles.repeatPass} type="password"  placeholder="Repeat Password" />
                </div>
                <div>
                    <button className="button-site-theme" type="submit">Create Account</button>
                </div>
            </form>
        </div>
    );
}

export default CreateUserPage;