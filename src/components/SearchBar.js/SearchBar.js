import styles from "./SearchBar.module.css";
import DropDown from "../SearchBar.js/DropDown";
import { useRef, useState } from "react";
import { fetchData } from "../../hooks/fetch";

function SearchBar() {
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [dropDownActive, setDropDownActive] = useState(false);

    const handleDropDown = () => {
        setDropDownActive(true);
    };

    const handleDropDownOut = () => {
        setDropDownActive(false);
    };
    
    const handleSearch = async (e) => {
        const query = e.target.value;
        if (query.length !== 0) {

            const response = await fetchData({
                type: "GET",
                url: `http://localhost:8080/api/search?query=${query}`,
                setIsLoading: setIsLoading
            });
            setItems(response);
        } else {
            setItems([]);
        }
    };

    return (
            <form className={styles.form} onFocus={handleDropDown} onBlur={handleDropDownOut}>
                <input className={styles.search} type="text" id="query" name="query" placeholder="Search"
                  onFocus={handleDropDown} onBlur={handleDropDownOut} onChange={handleSearch} />
                <DropDown active={dropDownActive} items={items} loadState={isLoading} />
            </form>
    );
}

export default SearchBar;