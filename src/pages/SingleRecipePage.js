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

    // useScrollIntoView("#app-nav", "start", "smooth");
    useFetch(`http://localhost:8080/api/recipes/${recipeId}/items/multiple`, 
    {setData: setItems, setErr: setError, setLoad: setIsLoading});
        
    return (
        <div>
            {isLoading && <Load />}
            <header className={styles.header}>
                <BackButton />
                <h1 className={styles.heading}>{recipeName}</h1>
                <p className={styles.desc}>{description}</p>
                <table className={styles.itemTable}>
                    {items.map((item) => <tr className={styles.item}><Item item={item} key={item.id} basic={false} 
                    showButtons={true}/></tr>)}
                </table>
            </header>
            {error && <ErrorMessage message={error}/>}

        </div>
    );
}

export default SingleRecipePage;