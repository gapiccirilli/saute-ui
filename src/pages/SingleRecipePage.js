import { useParams, useSearchParams } from "react-router-dom";
import { useState } from "react";
import ErrorMessage from "../components/Error/ErrorMessage";
import BackButton from "../components/Buttons/BackButton";
import Item from "../components/Item/Item";
import styles from "./PageStyles/SingleRecipePage.module.css";
import { useFetch } from "../hooks/useFetch";
import Load from "../loaders/Load";
import { useScrollIntoView } from "../hooks/useScrollIntoView";
import CloseButton from "../components/Buttons/CloseButton";
import AddForm from "../components/AddForm/AddForm";
import { useIngredients } from "../hooks/useIngredients";
import { useItems } from "../hooks/useItems";

function SingleRecipePage() {
    const { recipeId } = useParams();
    const [recipeParams, setRecipeParams] = useSearchParams();
    const {itemState, setters} = useItems();
    const {items, error} = itemState;
    const {setItems, setError, setItemsAndError} = setters;
    const {ingredientState, dispatchers} = useIngredients();
    const [isLoading, setIsLoading] = useState(false);
    const [showAddItem, setShowAddItem] = useState(false);
    const recipeName = recipeParams.get("name");
    const description = recipeParams.get("desc");

    // useScrollIntoView("#app-nav", {block: "start", behavior: "smooth"});
    useFetch(`http://localhost:8080/api/recipes/${recipeId}/items/multiple`, 
    {setData: setItems, setErr: setError, setLoad: setIsLoading});

    useFetch("http://localhost:8080/api/ingredients", 
    {setData: dispatchers.setIngredients, setErr: dispatchers.setError, setLoad: setIsLoading});
        
    return (
        <div className={styles.recipePage}>
            {isLoading && <Load />}
            <header className={styles.header}>
                <div className={styles.headLeft}>
                    <BackButton className={styles.backBtn} />
                </div>
                {!error && <div className={styles.headCenter}>
                    <h1 className={styles.heading}>{recipeName}</h1>
                    <p className={styles.desc}>{description}</p>
                </div>}
                <div className={styles.headRight}>
                    <button className={`${styles.addItemBtn} button-site-theme`} 
                    onClick={() => setShowAddItem(true)}>Add New Items</button>
                </div>
            </header>
            {!error && !isLoading && <table className={styles.itemTable}>
                <tr className={styles.tableHeader}>
                    <th>Amount</th>
                    <th>Measurement Type</th>
                    <th>Ingredient</th>
                    <th>Description</th>
                    <th>Time</th>
                </tr>
                {items.map((item) => <tr className={styles.item}><Item item={item} items={items} key={item.id} basic={false} 
                showButtons={true} setters={{setLoad: setIsLoading, setData: setItems, setDataAndError: setItemsAndError}} 
                ingredients={ingredientState} /></tr>)}
            </table>}
            {error && <ErrorMessage message={error}/>}

            {showAddItem && <AddForm basic={false} ingredients={ingredientState} setShowForm={setShowAddItem}
           setData={{setData: setItems, setErr: setError, setDataAndError: setItemsAndError, data: items}}
           resourceData={{
                    type: "POST",
                    url: `http://localhost:8080/api/recipes/${recipeId}/items`,
                    payload: {},
                    setIsLoading: setIsLoading
                }} />}
        </div>
    );
}

export default SingleRecipePage;