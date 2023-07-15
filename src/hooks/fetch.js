import { useState } from "react";

export function useFetchOnDemand() {
    const [error, setError] = useState("");
    const [data, setData] = useState({});

    async function fetchData(fetchType, url, payload) {
        // if (fetchType != "POST" || fetchType != "PUT") {
        //         console.error("Only 'POST' and 'PUT' may be used in 'useFetchOnDemand' hook");
        //     }
        try {
            const response = await fetch(url, {method: fetchType, headers: {"Content-Type": "application/json"}, 
            body: JSON.stringify(payload)});
        
            if (!response.ok) {
                const errorMessage = await response.json();
                throw new Error(errorMessage);
            }

            const responseData = await response.json();
            setData(responseData);
            return responseData;
        } catch (err) {
            const {message} = err;
            setError(message);
            return message;
        }

    }
    return fetchData;
}