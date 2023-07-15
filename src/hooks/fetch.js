import { useState } from "react";

export function useFetchOnDemand(fetchType, url) {
    const [error, setError] = useState("");
    const [data, setData] = useState({});

    if (fetchType !== "POST" || fetchType !== "PUT") {
        console.err("Only 'POST' and 'PUT' may be used in 'useFetchOnDemand' hook");
    }
        async function fetch(payload) {
        try {
            const response = await fetch(url, {method: fetchType, headers: {"Content-Type": "application/json"}, 
            body: JSON.stringify(payload)});
        
            if (!response.ok) {
                const errorMessage = await response.json();
                throw new Error(errorMessage);
            }

            const data = await response.json();
            setData(data);
        } catch (err) {
            const {message} = err;
            setError(message);
        }
        return [data, error, fireRequest];
    }
    function fireRequest(payload) {
        fetch(payload);
    }
}