import styles from "./SearchBar.module.css";
import Load from "../../loaders/Load";
import SearchLoad from "../../loaders/SearchLoad";
import { NavLink } from "react-router-dom";

function DropDown({ active, items, loadState }) {
    return (
        <div className={styles.dropdown} style={{height: active ? "14rem" : "0rem"}}>
            {!loadState ? items.map((item) => {
                let name;
                let url;
                switch (item.type) {
                    case "Ingredient":
                        name = item.ingredientName;
                        url = "ingredients";
                        break;
                    case "Recipe Book":
                        name = item.recipeBookName;
                        url = `books/${item.id}`;
                        break;
                    case "Recipe":
                        name = item.recipeName;
                        url = `books/${item.recipeBookId}/recipes/${item.id}?name=${name}&desc=${item.description}`;
                        break;
                    case "Shopping List":
                        name = item.listName;
                        url = `lists/${item.id}`;
                        break;
                    default:
                        name = "Unknown";
                        break;
                }
            return (
            <NavLink to={url}><div className={styles.dropItem}>
                <span className={styles.type}>{item.type}: </span>
                <span className={styles.name}>{name}</span>
            </div></NavLink>)}) : <SearchLoad />}
        </div>
    );
}

export default DropDown;