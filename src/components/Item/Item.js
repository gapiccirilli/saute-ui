import { Fragment, useState } from "react";
import styles from "./Item.module.css";
import DeleteButton from "../Buttons/DeleteButton";
import EditButton from "../Buttons/EditButton";
import CloseButton from "../Buttons/CloseButton";
import { fetchData } from "../../hooks/fetch";

function Item({item, items, basic, showButtons, setters}) {
    const {id, ingredientName, description, amount, measurementType, hours, minutes, seconds} = item;
    const [editMode, setEditMode] = useState(false);

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
        if (items > 1) {
            setters.setData(items.filter(item => item.id !== id), "");
        } else setters.setData(items.filter(item => item.id !== id), "No items found");
    };

    const onSubmit = async (e) => {
        console.log(e.target.elements)
        e.preventDefault()
        // const response = await fetchData({
        //     type: "PUT",
        //     url: `http://localhost:8080/api/items/${id}`,
        //     payload: {id: id,
        //          ingredientName: e.target.elements[2].value,
        //          description: e.target.elements[3].value,
        //          amount: e.target.elements[0].value,
        //          measurementType: e.target.elements[1].value,
        //          hours: e.target.elements[4].value,
        //          minutes: e.target.elements[5].value,
        //          seconds: e.target.elements[6].value},
        //     setIsLoading: setters.setLoad
        // });
        // setters.setData([...items.filter(item => item.id !== id), response]);
        setEditMode(false);
    };

    const onClose = () => {
        setEditMode(false);
    };

    return (
        <Fragment>
            <form className={styles.tableForm} id="table-form" onSubmit={onSubmit}/>
            <td className={`${!basic ? styles.amount : styles.basicAmount} ${styles.itemData}`}>
                {editMode ? <input className={styles.inAmt} name="amount" form="table-form" type="number" 
                defaultValue={amount} /> : amount}
            </td>

            <td className={`${!basic ? styles.type : styles.basicType} ${styles.itemData}`}>
                {editMode ? <input className={styles.inType} name="type" form="table-form" type="text" 
                defaultValue={measurementType} />
                 : measurementType}
                </td>

            <td className={`${!basic ? styles.name : styles.basicName} ${styles.itemData}`}>
                {editMode ? <select className={styles.inName} name="name" form="table-form">
                    {/* placeholder until ingredient fetch is implemented */}
                    <option>{ingredientName}</option>
                </select> : ingredientName}
                </td>

            {!basic && <td className={`${styles.desc} ${styles.itemData}`}>
                {editMode ? <input className={styles.inDesc} name="description" form="table-form" type="text" 
                defaultValue={description} /> : description}
                </td>}

            {!basic && <td className={`${styles.time} ${styles.itemData}`}>
                {hours > 0 ? <span className={styles.hour}>
                    {editMode ? <input className={styles.inHour} name="hour" form="table-form" type="number" 
                    defaultValue={hours} /> : hours} hr
                    </span> : null}
                {minutes > 0 ? <span className={styles.minute}>
                    {editMode ? <input className={styles.inMin} name="minute" form="table-form" type="number" 
                    defaultValue={minutes} /> : minutes} min
                    </span> : null}
                {seconds > 0 ? <span className={styles.second}>
                    {editMode ? <input className={styles.inSec} name="seconds" form="table-form" type="number" 
                    defaultValue={seconds} /> : seconds} sec
                    </span> : null}
            </td>}

            {showButtons && <td className={`${styles.btns} ${styles.itemData}`}>
                {editMode ? <button className={`${styles.submit} button-site-theme`} form="table-form" onClick={onSubmit}>
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