import { Fragment } from "react";
import styles from "./Item.module.css";
import DeleteButton from "../Buttons/DeleteButton";
import EditButton from "../Buttons/EditButton";

function Item({item, basic, showButtons}) {
    const {ingredientName, description, amount, measurementType, hours, minutes, seconds} = item;

    return (
        <Fragment>
            <td className={`${styles.amount} ${styles.itemData}`}>{amount}</td>
            {measurementType !== "N/A" ? <td className={`${styles.type} ${styles.itemData}`}>{measurementType}</td> : null}
            <td className={`${styles.name} ${styles.itemData}`}>{ingredientName}</td>
            {!basic && <td className={`${styles.desc} ${styles.itemData}`}>{description}</td>}
            {!basic && <td className={`${styles.time} ${styles.itemData}`}>
                {hours > 0 ? <span className={styles.hour}>{hours} hr</span> : null}
                {minutes > 0 ? <span className={styles.minute}>{minutes} min</span> : null}
                {seconds > 0 ? <span className={styles.second}>{seconds} sec</span> : null}
            </td>}
            {showButtons && <td className={`${styles.btns} ${styles.itemData}`}><EditButton /><DeleteButton /></td>}
        </Fragment>
    );
}

export default Item;