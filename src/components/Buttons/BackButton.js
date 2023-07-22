import { useNavigate } from "react-router-dom";


function BackButton({className}) {
    const navigate = useNavigate();

    return (
        <button className={`${className} button-site-theme`} onClick={() => navigate(-1)}>
           &larr; Back
        </button>
    );
}

export default BackButton;