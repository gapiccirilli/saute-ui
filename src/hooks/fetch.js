

    export async function fetchData(fetchData) {
        // if (fetchType != "POST" || fetchType != "PUT") {
        //         console.error("Only 'POST' and 'PUT' may be used in 'useFetchOnDemand' hook");
        //     }
        const {type, url, payload, setIsLoading} = fetchData;
        try {
            setIsLoading(true);
            const response = await fetch(url, {method: type, headers: {"Content-Type": "application/json"}, 
            body: JSON.stringify(payload)});
        
            if (!response.ok) {
                const errorMessage = await response.json();
                throw new Error(errorMessage);
            }

            const responseData = await response.json();

            setIsLoading(false);
            return responseData;
        } catch (err) {
            const {message} = err;
            setIsLoading(false);
            return message;
        }

    }