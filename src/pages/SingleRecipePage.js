import { useParams, useSearchParams } from "react-router-dom";
import { useState } from "react";
import ErrorMessage from "../components/Error/ErrorMessage";
import BackButton from "../components/Buttons/BackButton";
import Item from "../components/Item/Item";
import styles from "./PageStyles/SingleRecipePage.module.css";
import { useFetch } from "../hooks/useFetch";
import Load from "../loaders/Load";
import { useScrollIntoView } from "../hooks/useScrollIntoView";

function SingleRecipePage() {
    const { recipeId } = useParams();
    const [recipeParams, setRecipeParams] = useSearchParams();
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const recipeName = recipeParams.get("name");
    const description = recipeParams.get("desc");

    // useScrollIntoView("#app-nav", {block: "start", behavior: "smooth"});
    useFetch(`http://localhost:8080/api/recipes/${recipeId}/items/multiple`, 
    {setData: setItems, setErr: setError, setLoad: setIsLoading});
        
    return (
        <div className={styles.recipePage}>
            {isLoading && <Load />}
            {!error && <header className={styles.header}>
                <div className={styles.headLeft}>
                    <BackButton className={styles.backBtn} />
                </div>
                <div className={styles.headCenter}>
                    <h1 className={styles.heading}>{recipeName}</h1>
                    <p className={styles.desc}>{description}</p>
                </div>
                <div className={styles.headRight}></div>
            </header>}
            {!error && <table className={styles.itemTable}>
                <tr className={styles.tableHeader}>
                    <th>Amount</th>
                    <th>Measurement Type</th>
                    <th>Ingredient</th>
                    <th>Description</th>
                    <th>Time</th>
                </tr>
                {items.map((item) => <tr className={styles.item}><Item item={item} key={item.id} basic={false} 
                showButtons={true}/></tr>)}
            </table>}
            {error && <ErrorMessage message={error}/>}
            <button className={`${styles.addItemBtn} button-site-theme`}>Add New Item</button>
        </div>
    );
}

export default SingleRecipePage;