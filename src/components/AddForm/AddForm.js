import { fetchData } from "../../hooks/fetch";
import styles from "./AddForm.module.css";

function AddForm({basic, ingredients, setShowForm, setData, resourceData}) {

    const resetFields = (elements) => {
        for (const element of elements) {
            element.value = element.defaultValue;
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        resourceData["payload"] = {
            ingredientId: event.target.elements[2].value,
            description: basic ? "" : event.target.elements[3].value,
            amount: event.target.elements[0].value,
            measurementType: event.target.elements[1].value,
            hours: basic ? "0" : event.target.elements[4].value,
            minutes: basic ? "0" : event.target.elements[5].value,
            seconds: basic ? "0" : event.target.elements[6].value
        }
        const response = await fetchData(resourceData);
        if (response.id) {
            setData.setDataAndError([...setData.data, response], null);
        } else {
            setData.setErr(response);
        }
        resetFields(event.target.elements)
    };

    const handleCancel = () => {
        setShowForm(false);
    };

    return (
        <form className={basic ? styles.formBasic : styles.form} onSubmit={handleSubmit}>
            <div className={styles.inputFields}>
                <div className={basic ? styles.amtBasic : styles.amt}>
                    <input type="number" name="amount" defaultValue={1} min="1" />
                </div>
                <div className={basic ? styles.typeBasic : styles.type}>
                    <input type="text" name="measurementType" defaultValue="" placeholder="Measurement Type" />
                </div>
                <div className={basic ? styles.ingredientBasic : styles.ingredient}>
                    <select name="ingredientId"> {ingredients.ingredients.map((ingredient) => 
                        <option value={ingredient.id}>
                            {ingredient.ingredientName}
                        </option>)}
                    </select>
                </div>
                {!basic && <div className={styles.desc}>
                    <input type="text" name="description" defaultValue="" placeholder="Description" />
                </div>}
                {!basic && <div className={styles.time}>
                    <input type="number" name="hours" defaultValue={0} min="0" /> hrs 
                    <input type="number" name="minutes" defaultValue={0} min="0" /> mins 
                    <input type="number" name="seconds" defaultValue={0} min="0" /> secs 
                </div>}
            </div>

            <div className={styles.btns}>
                <button className={`${styles.submit} button-site-theme`} type="submit">Submit</button>
                <button className={`button-close-theme`} type="button" onClick={handleCancel}>Cancel</button>
            </div>
        </form>
    );
}

export default AddForm;