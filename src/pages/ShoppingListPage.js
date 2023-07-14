import ShoppingListCard from "../components/Cards/ShoppingListCard";
import AddNewCard from "../components/Cards/AddNewCard";
import ErrorMessage from "../components/Error/ErrorMessage";
import { useEffect, useState } from "react";
import { useModal } from "../hooks/useModal";
import Modal from "../components/Modals/Modal";

function ShoppingListPage() {
    const [shoppingLists, setShoppingLists] = useState([]);
    const [error, setError] = useState("");
    const [modalState, events] = useModal();

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
        events.add("add-list");
    };

    const handleEditList = (list) => {
        events.edit("edit-list", list);
    };

    const handleListDelete = (listId) => {
        setShoppingLists((prev) => {
            return prev.filter((list) => list.id !== listId);
        });
    };

    const handleCloseModal = () => {
        events.close();
    };

    return (
        <div>
            {modalState.isOpen && <Modal modalState={modalState} onClose={handleCloseModal} />}
            {!error && shoppingLists.map((list) => <ShoppingListCard list={list} key={list.id} onDeleteList={handleListDelete}
            onEditList={handleEditList} />)}
            {!error && <AddNewCard onAdd={handleAddList}>List</AddNewCard>}
            {error && <ErrorMessage message={error}/>}
        </div>
    );
}

export default ShoppingListPage;