import ShoppingListCard from "../components/Cards/ShoppingListCard";
import AddNewCard from "../components/Cards/AddNewCard";
import ErrorMessage from "../components/Error/ErrorMessage";
import { useEffect, useState } from "react";
import { useModal } from "../hooks/useModal";
import Modal from "../components/Modals/Modal";

function ShoppingListPage() {
    const [shoppingLists, setShoppingLists] = useState([]);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [modalState, dispatch] = useModal();

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

    const handleAddList = () => {
        dispatch({type: "add-list", payload: {lists: shoppingLists}});
    };

    const handleEditList = (list) => {
        dispatch({type: "edit-list", payload: {list: list, lists: shoppingLists}});
    };

    const handleListDelete = (listId) => {
        setShoppingLists((prev) => {
            return prev.filter((list) => list.id !== listId);
        });
    };

    const handleCloseModal = () => {
        dispatch({ type: "close" });
    };

    const setters = {
        setLists: setShoppingLists,
        setLoad: setIsLoading,
        setErr: setError
    };

    return (
        <div>
            {modalState.isOpen && <Modal modalState={modalState} onClose={handleCloseModal} setData={setters} />}
            {!error && shoppingLists.map((list) => <ShoppingListCard list={list} key={list.id} onDeleteList={handleListDelete}
            onEditList={handleEditList} />)}
            {!error && <AddNewCard onAdd={handleAddList}>List</AddNewCard>}
            {error && <ErrorMessage message={error}/>}
        </div>
    );
}

export default ShoppingListPage;