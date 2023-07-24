import { useParams, useSearchParams } from "react-router-dom";
import ErrorMessage from "../components/Error/ErrorMessage";
import BackButton from "../components/Buttons/BackButton";
import styles from "./PageStyles/SingleShoppingListPage.module.css";
import ShoppingListTable from "../components/ShoppingListTable.js/ShoppingListTable";
import Load from "../loaders/Load";
import { useScrollIntoView } from "../hooks/useScrollIntoView";

function SingleShoppingListPage() {
    const { listId } = useParams();
    const [listParams, setListParams] = useSearchParams();
    const listName = listParams.get("name");

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
                <div className={styles.headRight}></div>
            </header>
            <ShoppingListTable listId={listId} />
        </div>
    );
}

export default SingleShoppingListPage;