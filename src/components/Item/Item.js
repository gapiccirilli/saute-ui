import { Fragment, useState } from "react";
import styles from "./Item.module.css";
import DeleteButton from "../Buttons/DeleteButton";
import EditButton from "../Buttons/EditButton";

function Item({item, basic, showButtons}) {
    const {id, ingredientName, description, amount, measurementType, hours, minutes, seconds} = item;
    const [editMode, setEditMode] = useState(false);

    const onEdit = () => {
        setEditMode(true);
    };

    return (
        <Fragment>
            <td className={`${styles.amount} ${styles.itemData}`}>
                {editMode ? <input className={styles.inAmt} type="number" defaultValue={amount} /> : amount}
            </td>

            {measurementType !== "N/A" ? <td className={`${styles.type} ${styles.itemData}`}>
                {editMode ? <input className={styles.inType} type="text" defaultValue={measurementType} /> : measurementType}
                </td> : null}

            <td className={`${styles.name} ${styles.itemData}`}>
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
                <button className={`${styles.edit} button-site-theme`} onClick={onEdit}>Edit</button>
                <button className={`${styles.delete} button-site-theme`}>Delete</button>
                </td>}
        </Fragment>
    );
}

export default Item;