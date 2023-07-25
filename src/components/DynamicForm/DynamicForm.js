import { useState } from "react";
import styles from "./DynamicForm.module.css";

function DynamicForm({formData, setShowForm}) {
    const [formFields, setFormFields] = useState([formData]);

    const handleFormChange = (event, index) => {
        let data = [...formFields];
        data[index][event.target.name] = event.target.value;
        setFormFields(data);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
    };

    const handleAddForm = () => {
        setFormFields([...formFields, {
            amount: "1",
            type: "",
            ingredient: "",
            description: "",
            hour: "0",
            minute: "0",
            second: "0"
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
                                <input type="text" name="type" 
                                onChange={event => handleFormChange(event, index)} value={form.type} placeholder="Measurement Type" />
                            </div>
                            <div className={styles.ingredient}><select name="ingredient" 
                            onChange={event => handleFormChange(event, index)} value={form.ingredient}>
                                <option>Tomato</option></select>
                            </div>
                            <div className={styles.desc}>
                                <input type="text" name="description" 
                                onChange={event => handleFormChange(event, index)} value={form.description} placeholder="Description" />
                            </div>
                            <div className={styles.time}>
                                <input type="number" name="hour" 
                                onChange={event => handleFormChange(event, index)} value={form.hour} min="0" /> hrs 
                                <input type="number" name="minute" 
                                onChange={event => handleFormChange(event, index)} value={form.minute} min="0" /> mins 
                                <input type="number" name="second" 
                                onChange={event => handleFormChange(event, index)} value={form.second} min="0" /> secs 
                            </div>
                        </div>)
            })}
            <div className={styles.btns}>
                <button className={`${styles.submit} button-site-theme`} onClick={handleSubmit}>Submit</button>
                <button className={`button-site-theme`} onClick={handleAddForm}>Add Item</button>
                <button className={`button-close-theme`} onClick={handleCancel}>Cancel</button>
            </div>
        </form>
    );
}

export default DynamicForm;