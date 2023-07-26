import { useState } from "react";
import styles from "./DynamicForm.module.css";
import { fetchData } from "../../hooks/fetch";

function DynamicForm({basic, ingredients, setShowForm, setData, resourceData}) {
    const formData = {
        id: 1,
        ingredientId: 12,
        ingredientName: "",
        description: "",
        amount: 1,
        measurementType: "",
        hours: 0,
        minutes: 0,
        seconds: 0
};
    const [formFields, setFormFields] = useState([formData]);

    const handleFormChange = (event, index) => {
        let data = [...formFields];
        data[index][event.target.name] = event.target.value;
        setFormFields(data);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (formFields.length === 1) {
            resourceData["url"] = resourceData["url"][0];
            resourceData["payload"] = formFields[0];
        } else {
            resourceData["url"] = resourceData["url"][1];
            resourceData["payload"] = formFields;
        }
        const response = await fetchData(resourceData);
        if (response.length > 1) {
            setData.setDataAndError([...setData.data, ...response]);
        } else if (response.length === undefined) {
            setData.setDataAndError([...setData.data, response], null);
        } else {
            setData.setErr(response.message)
        }
        setShowForm(false);
    };

    const handleAddForm = () => {
        setFormFields([...formFields, {
            id: "1",
            ingredientId: "12",
            ingredientName: "",
            description: "",
            amount: "1",
            measurementType: "",
            hours: "0",
            minutes: "0",
            seconds: "0"
        }]);
    };

    const handleCancel = () => {
        setShowForm(false);
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            {formFields.map((form, index) => {
                return (<div className={styles.formInstance} key={index}>
                            <div className={styles.amt}>
                                <input type="number" name="amount" 
                                onChange={event => handleFormChange(event, index)} value={form.amount} min="1" />
                            </div>
                            <div className={styles.type}>
                                <input type="text" name="measurementType" 
                                onChange={event => handleFormChange(event, index)} value={form.measurementType} 
                                placeholder="Measurement Type" />
                            </div>
                            <div className={styles.ingredient}><select name="ingredientId" 
                            onChange={event => handleFormChange(event, index)} value={form.ingredientId}>
                                {ingredients.ingredients.map((ingredient) => 
                                <option value={ingredient.id}>
                                    {ingredient.ingredientName}
                                </option>)}
                            </select>
                            </div>
                            {!basic && <div className={styles.desc}>
                                <input type="text" name="description" 
                                onChange={event => handleFormChange(event, index)} value={form.description} placeholder="Description" />
                            </div>}
                            {!basic && <div className={styles.time}>
                                <input type="number" name="hours" 
                                onChange={event => handleFormChange(event, index)} value={form.hours} min="0" /> hrs 
                                <input type="number" name="minutes" 
                                onChange={event => handleFormChange(event, index)} value={form.minutes} min="0" /> mins 
                                <input type="number" name="seconds" 
                                onChange={event => handleFormChange(event, index)} value={form.seconds} min="0" /> secs 
                            </div>}
                        </div>)
            })}
            <div className={styles.btns}>
                <button className={`${styles.submit} button-site-theme`} onClick={handleSubmit}>Submit</button>
                <button className={`button-site-theme`} type="button" onClick={handleAddForm}>Add Item</button>
                <button className={`button-close-theme`} type="button" onClick={handleCancel}>Cancel</button>
            </div>
        </form>
    );
}

export default DynamicForm;