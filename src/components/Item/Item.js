import { Fragment, useRef, useState } from "react";
import styles from "./Item.module.css";
import DeleteButton from "../Buttons/DeleteButton";
import EditButton from "../Buttons/EditButton";
import CloseButton from "../Buttons/CloseButton";
import { fetchData } from "../../hooks/fetch";

function Item({item, items, basic, showButtons, setters, ingredients}) {
    const {id, ingredientId, ingredientName, description, amount, measurementType, hours, minutes, seconds} = item;
    const [editMode, setEditMode] = useState(false);

    const amtInput = useRef(null);
    const typeInput = useRef(null);
    const ingrNameInput = useRef(null);
    const descInput = useRef(null);
    const hrInput = useRef(null);
    const minInput = useRef(null);
    const secInput = useRef(null);

    const onEdit = (e) => {
        e.preventDefault();
        setEditMode(true);
    };

    const onDelete = async () => {
        const response = await fetchData({
            type: "DELETE",
            url: `http://localhost:8080/api/items/${id}`,
            setIsLoading: setters.setLoad
        });
        if (items.length > 1) {
            setters.setData(items.filter(item => item.id !== id));
        } else {
            setters.setDataAndError(items.filter(item => item.id !== id), "No items found");
        }
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        const response = await fetchData({
            type: "PUT",
            url: `http://localhost:8080/api/items/${id}`,
            payload: {id: id,
                 ingredientName: "",
                 ingredientId: ingrNameInput.current.value,
                 description: basic ? "" : descInput.current.value,
                 amount: amtInput.current.value,
                 measurementType: typeInput.current.value,
                 hours: basic ? 0 : hrInput.current.value,
                 minutes: basic ? 0 : minInput.current.value,
                 seconds: basic ? 0 : secInput.current.value},
            setIsLoading: setters.setLoad
        });
        setters.setData([...items.filter(item => item.id !== id), response]);
        setEditMode(false);
    };

    const onClose = () => {
        setEditMode(false);
    };

    return (
        <Fragment>
            <td className={`${!basic ? styles.amount : styles.basicAmount} ${styles.itemData}`}>
                {editMode ? <input className={styles.inAmt} name="amount" ref={amtInput} type="number" 
                defaultValue={amount} /> : amount}
            </td>

            <td className={`${!basic ? styles.type : styles.basicType} ${styles.itemData}`}>
                {editMode ? <input className={styles.inType} name="type" ref={typeInput} type="text" 
                defaultValue={measurementType} />
                 : measurementType}
                </td>

            <td className={`${!basic ? styles.name : styles.basicName} ${styles.itemData}`}>
                {editMode ? <select className={styles.inName} name="name" ref={ingrNameInput}>
                    {ingredients.ingredients.map((ingredient) => 
                    <option value={ingredient.id} selected={ingredient.id == ingredientId ? true : false}>
                        {ingredient.ingredientName}
                    </option>)}
                </select> : ingredientName}
                </td>

            {!basic && <td className={`${styles.desc} ${styles.itemData}`}>
                {editMode ? <input className={styles.inDesc} name="description" ref={descInput} type="text" 
                defaultValue={description} /> : description}
                </td>}

            {!basic && <td className={`${styles.time} ${styles.itemData}`}>
                {hours > 0 ? <span className={styles.hour}>
                    {editMode ? <input className={styles.inHour} name="hour" ref={hrInput} type="number" 
                    defaultValue={hours} /> : hours} hr 
                    </span> : null}
                {editMode && (hours === 0) && <input className={styles.inHour} name="hour" ref={hrInput} type="number" 
                defaultValue={hours === undefined || hours === null ? 0 : hours} />}

                {minutes > 0 ? <span className={styles.minute}>
                    {editMode ? <input className={styles.inMin} name="minute" ref={minInput} type="number" 
                    defaultValue={minutes} /> : minutes} min 
                    </span> : null}
                {editMode && (minutes === 0) && <input className={styles.inMin} name="minute" ref={minInput} type="number" 
                defaultValue={minutes === undefined || minutes === null ? 0 : minutes} />}

                {seconds > 0 ? <span className={styles.second}>
                    {editMode ? <input className={styles.inSec} name="seconds" ref={secInput} type="number" 
                    defaultValue={seconds} /> : seconds} sec 
                    </span> : null}
                {editMode && (seconds === 0) && <input className={styles.inSec} name="seconds" ref={secInput} type="number" 
                defaultValue={seconds === undefined || seconds === null ? 0 : seconds} />}
            </td>}

            {showButtons && <td className={`${styles.btns} ${styles.itemData}`}>
                {editMode ? <button className={`${styles.submit} button-site-theme`} onClick={onSubmit}>
                    Submit
                </button> : <button className={`${styles.edit} button-site-theme`} onClick={onEdit}>
                    Edit
                    </button>}

                {editMode ? <CloseButton className="button-close-theme" onClose={onClose} />
                 : <button className={`${styles.delete} button-site-theme`} onClick={onDelete}>
                    Delete
                    </button>}
                </td>}
        </Fragment>
    );
}

export default Item;