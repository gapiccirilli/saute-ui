import { useParams, useSearchParams } from "react-router-dom";
import { useEffect, useReducer, useState } from "react";
import ErrorMessage from "../components/Error/ErrorMessage";
import BackButton from "../components/Buttons/BackButton";
import styles from "./PageStyles/SingleRecipePage.module.css";
import ShoppingListTable from "../components/ShoppingListTable.js/ShoppingListTable";
import { ShoppingListProvider } from "../contexts/ShoppingListTableProvider";


function SingleShoppingListPage() {
    const { listId } = useParams();
    const [listParams, setListParams] = useSearchParams();
    const listName = listParams.get("name");

    return (
        <div>
            <BackButton />
            <ShoppingListProvider listId={listId} listName={listName}>
                <ShoppingListTable />
            </ShoppingListProvider>
        </div>
    );
}

export default SingleShoppingListPage;