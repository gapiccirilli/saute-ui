import { useEffect } from "react";

export function useFetch(url, stateFunctions) {
    const {setData, setErr, setLoad} = stateFunctions;
    useEffect(() => {
        async function get() {
            setLoad(true);
            try {
                const response = await fetch(url, {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("auth")
                    }
                });

            if (!response.ok) {
                const errorMessage = await response.json();
                throw new Error(errorMessage.message);
            }

            const data = await response.json();
            setData(data);
            setLoad(false);
            } catch(err) {
                const {message} = err;
                setErr(message);
                setLoad(false);
            }
        }
        get();
    }, [url])
}