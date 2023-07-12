import { Fragment } from "react";
import styles from "./Item.module.css";
import DeleteButton from "../Buttons/DeleteButton";
import EditButton from "../Buttons/EditButton";

function Item({item, basic}) {
    const {ingredientName, description, amount, measurementType, hours, minutes, seconds} = item;

    return (
        <Fragment>
            <td className={styles.amount}>{amount}</td>
            {measurementType !== "N/A" ? <td className={styles.type}>{measurementType}</td> : null}
            <td className={styles.name}>{ingredientName}</td>
            {!basic && <td className={styles.desc}>{description}</td>}
            {!basic && <td className={styles.time}>
                {hours > 0 ? <span className={styles.hour}>{hours} hr</span> : null}
                {minutes > 0 ? <span className={styles.minute}>{minutes} min</span> : null}
                {seconds > 0 ? <span className={styles.second}>{seconds} sec</span> : null}
            </td>}
            <td className={styles.btns}><EditButton /><DeleteButton /></td>
        </Fragment>
    );
}

export default Item;