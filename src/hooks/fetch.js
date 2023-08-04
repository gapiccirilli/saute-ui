

    export async function fetchData(fetchData) {

        const {type, url, payload, setIsLoading} = fetchData;
        try {
            setIsLoading(true);
            const response = await fetch(url, {method: type, headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("auth")
            }, 
            body: JSON.stringify(payload)});

            if (!response.ok) {
                const errorMessage = await response.json();
                throw new Error(errorMessage.message);
            }

            const responseData = await response.json();

            setIsLoading(false);
            return responseData;
        } catch (err) {
            setIsLoading(false);
            return err;
        }

    }