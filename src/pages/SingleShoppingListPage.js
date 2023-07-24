import { useParams, useSearchParams } from "react-router-dom";
import ErrorMessage from "../components/Error/ErrorMessage";
import BackButton from "../components/Buttons/BackButton";
import styles from "./PageStyles/SingleShoppingListPage.module.css";
import Item from "../components/Item/Item";
import Load from "../loaders/Load";
import { useScrollIntoView } from "../hooks/useScrollIntoView";
import { useState } from "react";
import { useFetch} from "../hooks/useFetch";
 
function SingleShoppingListPage() {
    const { listId } = useParams();
    const [listParams, setListParams] = useSearchParams();
    const listName = listParams.get("name");
    const errorStr = "No Items Found"

    const [items, setItems] = useState([]);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState("");
    useFetch(`http://localhost:8080/api/shopping-lists/${listId}/items/multiple`,
    {
        setData: setItems,
        setErr: setError,
        setLoad: setIsLoading
    });

    // useScrollIntoView("#app-nav", {block: "start", behavior: "smooth"});
    return (
        <div className={styles.shoppingListPage}>
            <header className={styles.header}>
                <div className={styles.headLeft}>
                    <BackButton className={styles.backBtn} />
                </div>
                {!error && <div className={styles.headCenter}>
                    <h1>{listName}</h1>
                </div>}
                <div className={styles.headRight}>
                    <button className={`${styles.addItemBtn} button-site-theme`}>Add New Item</button>
                </div>
            </header>
            {!error && <table className={styles.listTable}>
                <tbody>
                    {!error && !isLoading && 
                    items.map((item) => <tr><Item item={item} basic={true} showButtons={true} /></tr>)}
                </tbody>
            </table>}
            {error && !isLoading && <ErrorMessage message={errorStr} />}
        </div>
    );
}

export default SingleShoppingListPage;