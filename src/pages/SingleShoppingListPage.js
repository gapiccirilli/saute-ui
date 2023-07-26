import { useParams, useSearchParams } from "react-router-dom";
import ErrorMessage from "../components/Error/ErrorMessage";
import BackButton from "../components/Buttons/BackButton";
import styles from "./PageStyles/SingleShoppingListPage.module.css";
import Item from "../components/Item/Item";
import Load from "../loaders/Load";
import { useScrollIntoView } from "../hooks/useScrollIntoView";
import { useState } from "react";
import { useFetch} from "../hooks/useFetch";
import { useItems } from "../hooks/useItems";
import { useIngredients } from "../hooks/useIngredients";
import DynamicForm from "../components/DynamicForm/DynamicForm";
 
function SingleShoppingListPage() {
    const { listId } = useParams();
    const [listParams, setListParams] = useSearchParams();
    const listName = listParams.get("name");
    const errorStr = "No Items Found"

    const {itemState, setters} = useItems();
    const {items, error} = itemState;
    const {setItems, setError, setItemsAndError} = setters;

    const {ingredientState, dispatchers} = useIngredients();

    const [showAddItem, setShowAddItem] = useState(false);

    // const [items, setItems] = useState([]);
    // const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState("");
    useFetch(`http://localhost:8080/api/shopping-lists/${listId}/items/multiple`,
    {
        setData: setItems,
        setErr: setError,
        setLoad: setIsLoading
    });

    useFetch("http://localhost:8080/api/ingredients", 
    {setData: dispatchers.setIngredients, setErr: dispatchers.setError, setLoad: setIsLoading});

    // useScrollIntoView("#app-nav", {block: "start", behavior: "smooth"});
    return (
        <div className={styles.shoppingListPage}>
            <header className={styles.header}>
                <div className={styles.headLeft}>
                    <BackButton className={styles.backBtn} />
                </div>
                <div className={styles.headCenter}>
                    <h1>{listName}</h1>
                </div>
                <div className={styles.headRight}>
                    <button className={`${styles.addItemBtn} button-site-theme`} 
                    onClick={() => setShowAddItem(true)}>Add New Items</button>
                </div>
            </header>
            {!error && <table className={styles.listTable}>
                <tbody> 
                    {items.map((item) => <tr><Item item={item} items={items} key={item.id} basic={true} showButtons={true} 
                    setters={{setLoad: setIsLoading, setData: setItems, setDataAndError: setItemsAndError}} 
                    ingredients={ingredientState} /></tr>)}
                </tbody>
            </table>}
            {error && <ErrorMessage message={error}/>}

            {showAddItem && <DynamicForm ingredients={ingredientState} setShowForm={setShowAddItem}
           setData={{setData: setItems, setErr: setError, setDataAndError: setItemsAndError, data: items}}
           resourceData={{
                    type: "POST",
                    url: [`http://localhost:8080/api/shopping-lists/${listId}/items`,
                          `http://localhost:8080/api/shopping-lists/${listId}/items/multiple`],
                    payload: [],
                    setIsLoading: setIsLoading
                }} />}
        </div>
    );
}

export default SingleShoppingListPage;