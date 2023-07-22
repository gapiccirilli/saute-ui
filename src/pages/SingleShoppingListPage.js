import { useParams, useSearchParams } from "react-router-dom";
import ErrorMessage from "../components/Error/ErrorMessage";
import BackButton from "../components/Buttons/BackButton";
import styles from "./PageStyles/SingleRecipePage.module.css";
import ShoppingListTable from "../components/ShoppingListTable.js/ShoppingListTable";
import Load from "../loaders/Load";
import { useScrollIntoView } from "../hooks/useScrollIntoView";

function SingleShoppingListPage() {
    const { listId } = useParams();
    const [listParams, setListParams] = useSearchParams();
    const listName = listParams.get("name");

    useScrollIntoView("#app-nav", {block: "start", behavior: "smooth"});
    return (
        <div>
            <BackButton />
            <ShoppingListTable listId={listId} listName={listName} />
        </div>
    );
}

export default SingleShoppingListPage;