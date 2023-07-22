import styles from "./Page.module.css";
import ShoppingListCard from "../components/Cards/ShoppingListCard";
import AddButton from "../components/Buttons/AddButton";
import ErrorMessage from "../components/Error/ErrorMessage";
import { useState } from "react";
import { useModal } from "../hooks/useModal";
import Modal from "../components/Modals/Modal";
import { useFetch } from "../hooks/useFetch";
import { useScrollIntoView } from "../hooks/useScrollIntoView";
import Load from "../loaders/Load";

function ShoppingListPage() {
    const [shoppingLists, setShoppingLists] = useState([]);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [modalState, dispatch] = useModal();

    // useScrollIntoView("#app-nav", {block: "start", behavior: "smooth"});
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
            {!error && !isLoading && <nav className={styles.gridNav}>
                <AddButton className="button-site-theme flex-add" onAdd={handleAddList}>Add List</AddButton>
                </nav>}
            {!error && !isLoading && <div className={styles.gridContent}>
                {shoppingLists.map((list) => <ShoppingListCard list={list} key={list.id} onDeleteList={handleListDelete}
            onEditList={handleEditList} />)}</div>}
            {error && <ErrorMessage message={error}/>}
        </div>
    );
}

export default ShoppingListPage;