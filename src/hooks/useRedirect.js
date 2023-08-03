import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


export function useRedirect(url, booleanCheck) {
    const navigate = useNavigate();

    useEffect(() => {
        if (booleanCheck) {
            navigate(url);
        }
    }, [booleanCheck]);
}