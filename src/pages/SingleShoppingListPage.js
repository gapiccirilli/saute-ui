import { useParams, useSearchParams } from "react-router-dom";
import { useEffect, useReducer, useState } from "react";
import ErrorMessage from "../components/Error/ErrorMessage";
import BackButton from "../components/Buttons/BackButton";
import styles from "./PageStyles/SingleRecipePage.module.css";
import ShoppingListTable from "../components/ShoppingListTable.js/ShoppingListTable";
import Load from "../loaders/Load";

function SingleShoppingListPage() {
    const { listId } = useParams();
    const [listParams, setListParams] = useSearchParams();
    const listName = listParams.get("name");

    return (
        <div>
            <BackButton />
            <ShoppingListTable listId={listId} listName={listName} />
        </div>
    );
}

export default SingleShoppingListPage;