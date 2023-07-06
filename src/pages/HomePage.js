import { Link } from "react-router-dom";

function HomePage() {
    return (
        <div>
            <h1>Home</h1>
            <Link to="saute">GO TO APP</Link>
        </div>
    );
}

export default HomePage;