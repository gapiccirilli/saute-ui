import styles from "./Page.module.css";
import ShoppingListCard from "../components/Cards/ShoppingListCard";
import AddNewCard from "../components/Cards/AddNewCard";
import ErrorMessage from "../components/Error/ErrorMessage";
import { useEffect, useState } from "react";
import { useModal } from "../hooks/useModal";
import Modal from "../components/Modals/Modal";
import { useFetch } from "../hooks/useFetch";
import Load from "../loaders/Load";

function ShoppingListPage() {
    const [shoppingLists, setShoppingLists] = useState([]);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [modalState, dispatch] = useModal();

    useFetch("http://localhost:8080/api/shopping-lists", {setData: setShoppingLists, setErr: setError, setLoad: setIsLoading});

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
        <div className={styles.page}>
            {isLoading && <Load />}
            {modalState.isOpen && <Modal modalState={modalState} onClose={handleCloseModal} setData={setters} />}
            {!error && shoppingLists.map((list) => <ShoppingListCard list={list} key={list.id} onDeleteList={handleListDelete}
            onEditList={handleEditList} />)}
            {!error && !isLoading && <AddNewCard onAdd={handleAddList}>List</AddNewCard>}
            {error && <ErrorMessage message={error}/>}
        </div>
    );
}

export default ShoppingListPage;