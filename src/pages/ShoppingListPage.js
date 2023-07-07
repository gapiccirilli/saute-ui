import ShoppingListCard from "../components/Cards/ShoppingListCard";
import AddNewCard from "../components/Cards/AddNewCard";
import ErrorMessage from "../components/Error/ErrorMessage";
import { useEffect, useState } from "react";

function ShoppingListPage() {
    const [shoppingLists, setShoppingLists] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        async function getShoppingLists() {
            try {
                const response = await fetch("http://localhost:8080/api/shopping-lists");

            if (!response.ok) {
                const errorMessage = await response.json();
                throw new Error(errorMessage.message);
            }

            const data = await response.json();

            setShoppingLists(data);
            } catch(err) {
                const {message} = err;
                setError(message);
            }
        }
        getShoppingLists();
    }, [])

    // const dummyShoppingLists = [
    //     {
    //         id: 1,
    //         listName: "Wegmens List"
    //     },
    //     {
    //         id: 2,
    //         listName: "Giant Eagle List"
    //     },
    //     {
    //         id: 3,
    //         listName: "Whole Foods List"
    //     }
    // ];

    return (
        <div>
            {!error && shoppingLists.map((list) => <ShoppingListCard list={list} key={list.id} />)}
            {!error && <AddNewCard>List</AddNewCard>}
            {error && <ErrorMessage message={error}/>}
        </div>
    );
}

export default ShoppingListPage;