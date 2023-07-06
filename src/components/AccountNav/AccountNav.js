import AccountButton from "../AccountButton/AccountButton";
import Logo from "../Logo/Logo";


function AccountNav() {
    return (
        <nav>
            <ul>
                <li>
                    <Logo />
                </li>
                <li>
                    <AccountButton />
                </li>
                <li>
                    <button>Logout</button>
                </li>
            </ul>
        </nav>
    );
}

export default AccountNav;