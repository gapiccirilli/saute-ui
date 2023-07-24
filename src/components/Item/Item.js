import { Fragment, useState } from "react";
import styles from "./Item.module.css";
import DeleteButton from "../Buttons/DeleteButton";
import EditButton from "../Buttons/EditButton";
import CloseButton from "../Buttons/CloseButton";

function Item({item, basic, showButtons}) {
    const {id, ingredientName, description, amount, measurementType, hours, minutes, seconds} = item;
    const [editMode, setEditMode] = useState(false);

    const onEdit = () => {
        setEditMode(true);
    };

    const onSubmit = () => {
        // -> logic goes here <-
        setEditMode(false);
    };

    const onClose = () => {
        setEditMode(false);
    };

    return (
        <Fragment>
            <td className={`${!basic ? styles.amount : styles.basicAmount} ${styles.itemData}`}>
                {editMode ? <input className={styles.inAmt} type="number" defaultValue={amount} /> : amount}
            </td>

            <td className={`${!basic ? styles.type : styles.basicType} ${styles.itemData}`}>
                {editMode ? <input className={styles.inType} type="text" defaultValue={measurementType} /> : measurementType}
                </td>

            <td className={`${!basic ? styles.name : styles.basicName} ${styles.itemData}`}>
                {editMode ? <select className={styles.inName}>
                    {/* placeholder until ingredient fetch is implemented */}
                    <option>{ingredientName}</option>
                </select> : ingredientName}
                </td>

            {!basic && <td className={`${styles.desc} ${styles.itemData}`}>
                {editMode ? <input className={styles.inDesc} type="text" defaultValue={description} /> : description}
                </td>}

            {!basic && <td className={`${styles.time} ${styles.itemData}`}>
                {hours > 0 ? <span className={styles.hour}>
                    {editMode ? <input className={styles.inHour} type="number" defaultValue={hours} /> : hours} hr
                    </span> : null}
                {minutes > 0 ? <span className={styles.minute}>
                    {editMode ? <input className={styles.inMin} type="number" defaultValue={minutes} /> : minutes} min
                    </span> : null}
                {seconds > 0 ? <span className={styles.second}>
                    {editMode ? <input className={styles.inSec} type="number" defaultValue={seconds} /> : seconds} sec
                    </span> : null}
            </td>}

            {showButtons && <td className={`${styles.btns} ${styles.itemData}`}>
                {editMode ? <button className={`${styles.submit} button-site-theme`} onClick={onSubmit}>
                    Submit
                </button> : <button className={`${styles.edit} button-site-theme`} onClick={onEdit}>
                    Edit
                    </button>}

                {editMode ? <CloseButton className="button-close-theme" onClose={onClose} />
                 : <button className={`${styles.delete} button-site-theme`}>
                    Delete
                    </button>}
                </td>}
        </Fragment>
    );
}

export default Item;