import { fetchData } from "../../hooks/fetch";
import CloseButton from "../Buttons/CloseButton";
import styles from "./Modal.module.css";
import { createPortal } from "react-dom";
import { useParams } from "react-router-dom";

function AddBookModal({onClose, data, setData}) {
    const {recipeBooks} = data;
    const {setBooks, setLoad, setErr, setBooksAndErr} = setData;

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newBook = {recipeBookName: e.target.elements[0].value}
        const response = await fetchData({
            type: "POST",
            url: "http://localhost:8080/api/recipe-books",
            payload: newBook,
            setIsLoading: setLoad
        });

        if (response.id) {
            // setBooks([...recipeBooks, response]);
            // setErr("");
            setBooksAndErr([...recipeBooks, response], null);
        } else {
            setErr(response);
        }
        onClose();
    };

    return (
        <div className={`${styles.addBook} ${styles.modal}`}>
            <h2>Add RecipeBook</h2>
            <form className={styles.bookForm} onSubmit={handleSubmit}>
                <div>
                    <input type="text" id="book-name" placeholder="New Recipe Book" />
                </div>
                <div>
                    <button className={`${styles.submit} button-site-theme`} type="submit">Submit</button>
                    <CloseButton className="button-close-theme" onClose={onClose} />
                </div>
            </form>
        </div>
    );
}

function EditBookModal({onClose, data, setData}) {
    const {recipeBooks, recipeBook} = data;
    const {setBooks, setLoad, setErr} = setData;

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newBook = {...recipeBook, recipeBookName: e.target.elements[0].value}
        const response = await fetchData({
            type: "PUT",
            url: `http://localhost:8080/api/recipe-books/${recipeBook.id}`,
            payload: newBook,
            setIsLoading: setLoad
        });

        const bookList = recipeBooks.map((book) => book.id === response.id ? response : book);

        if (response.id) {
            setBooks(bookList);
        } else {
            setErr(response);
        }
        
        onClose();
    };
    
    return (
        <div className={`${styles.editBook} ${styles.modal}`}>
            <h2>Edit RecipeBook</h2>
            <form className={styles.bookForm} onSubmit={handleSubmit}>
                <div>
                    <input type="text" id="book-name" placeholder="Recipe Book" defaultValue={recipeBook.recipeBookName} />
                </div>
                <div>
                    <button className={`${styles.submit} button-site-theme`} type="submit">Submit</button>
                    <CloseButton className="button-close-theme" onClose={onClose} />
                </div>
            </form>
        </div>
    );
}

function AddRecipeModal({onClose, data, setData}) {
    const { bookId } = useParams();
    const {recipes} = data;
    const {setRecs, setLoad, setErr, setRecsAndErr} = setData;

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newRecipe = {recipeName: e.target.elements[0].value, description: e.target.elements[1].value};
        const response = await fetchData({
            type: "POST",
            url: `http://localhost:8080/api/recipe-books/${bookId}/recipes`,
            payload: newRecipe,
            setIsLoading: setLoad
        });

        if (response.id) {
            // setRecs([...recipes, response]);
            // setErr("");
            setRecsAndErr([...recipes, response], null);
        } else {
            setErr(response);
        }
        onClose();
    };
    return (
        <div className={`${styles.addRecipe} ${styles.modal}`}>
            <h2>Add Recipe</h2>
            <form className={styles.recipeForm} onSubmit={handleSubmit}>
                <div>
                    <input type="text" id="recipe-name" placeholder="Recipe Name" />
                    <input type="text" id="recipe-desc" placeholder="Description" />
                </div>
                <div>
                    <button className={`${styles.submit} button-site-theme`} type="submit">Submit</button>
                    <CloseButton className="button-close-theme" onClose={onClose} />
                </div>
            </form>
        </div>
    );
}

function EditRecipeModal({onClose, data, setData}) {
    const {recipes, recipe} = data;
    const {setRecs, setLoad, setErr} = setData;

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newRecipe = {...recipe, recipeName: e.target.elements[0].value}
        const response = await fetchData({
            type: "PUT",
            url: `http://localhost:8080/api/recipes/${recipe.id}`,
            payload: newRecipe,
            setIsLoading: setLoad
        });

        
        if (response.id) {
            const recipeList = recipes.map((recipe) => recipe.id === response.id ? response : recipe);
            setRecs(recipeList);
        } else {
            setErr(response);
        }
        
        onClose();
    };

    return (
        <div className={`${styles.editRecipe} ${styles.modal}`}>
            <h2>Edit Recipe</h2>
            <form className={styles.bookForm} onSubmit={handleSubmit}>
                <div>
                    <input type="text" id="recipe-name" placeholder="Recipe Name" defaultValue={recipe.recipeName} />
                    <input type="text" id="recipe-desc" placeholder="Description" defaultValue={recipe.description} />
                </div>
                <div>
                    <button className={`${styles.submit} button-site-theme`} type="submit">Submit</button>
                    <CloseButton className="button-close-theme" onClose={onClose} />
                </div>
            </form>
        </div>
    );
}

function AddIngredientModal({onClose, data, setData}) {
    const {ingredients} = data;
    const {setIng, setLoad, setErr, setIngrAndErr} = setData;

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(e.target.elements[0].value);

        const newIngredient = {ingredientName: e.target.elements[0].value}
        const response = await fetchData({
            type: "POST",
            url: "http://localhost:8080/api/ingredients",
            payload: newIngredient,
            setIsLoading: setLoad
        });

        if (response.id) {
            // setIng([...ingredients, response]);
            // setErr("");
            setIngrAndErr([...ingredients, response], null);
        } else {
            setErr(response);
        }

        onClose();
    };

    return (
        <div className={`${styles.addIngr} ${styles.modal}`}>
            <h2>Add Ingredient</h2>
            <form className={styles.ingrForm} onSubmit={handleSubmit}>
                <div>
                    <input type="text" id="ingr-name" placeholder="New Ingredient" />
                </div>
                <div>
                    <button className={`${styles.submit} button-site-theme`} type="submit">Submit</button>
                    <CloseButton className="button-close-theme" onClose={onClose} />
                </div>
            </form>
        </div>
    );
}

function EditIngredientModal({onClose, data, setData}) {
    const {ingredient, ingredients} = data;
    const {setIng, setLoad, setErr} = setData;

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newIngredient = {...ingredient, ingredientName: e.target.elements[0].value}
        const response = await fetchData({
            type: "PUT",
            url: `http://localhost:8080/api/ingredients/${ingredient.id}`,
            payload: newIngredient,
            setIsLoading: setLoad
        });

        const ingredientList = ingredients.map((item) => item.id === response.id ? response : item);

        if (response.id) {
            setIng(ingredientList);
        } else {
            setErr(response);
        }
        
        onClose();
    };

    return (
        <div className={`${styles.editIngr} ${styles.modal}`}>
            <h2>Edit Ingredient</h2>
            <form className={styles.ingrForm} onSubmit={handleSubmit}>
                <div>
                    <input type="text" id="ingr-name" placeholder="Ingredient" defaultValue={ingredient.ingredientName} />
                </div>
                <div>
                    <button className={`${styles.submit} button-site-theme`} type="submit">Submit</button>
                    <CloseButton className="button-close-theme" onClose={onClose} />
                </div>
            </form>
        </div>
    );
}

function AddListModal({onClose, data, setData}) {
    const {lists} = data;
    const {setLists, setLoad, setErr, setListsAndErr} = setData;

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newList = {listName: e.target.elements[0].value}
        const response = await fetchData({
            type: "POST",
            url: "http://localhost:8080/api/shopping-lists",
            payload: newList,
            setIsLoading: setLoad
        });

        if (response.id) {
            // setLists([...lists, response]);
            // setErr("");
            setListsAndErr([...lists, response], null);
        } else {
            setErr(response);
        }

        onClose();
    };
    return (
        <div className={`${styles.addList} ${styles.modal}`}>
            <h2>Add Shopping List</h2>
            <form className={styles.listForm} onSubmit={handleSubmit}>
                <div>
                    <input type="text" id="list-name" placeholder="List Name" />
                </div>
                <div>
                    <button className={`${styles.submit} button-site-theme`} type="submit">Submit</button>
                    <CloseButton className="button-close-theme" onClose={onClose} />
                </div>
            </form>
        </div>
    );
}

function EditListModal({onClose, data, setData}) {
    const {list, lists} = data;
    const {setLists, setLoad, setErr} = setData;

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newList = {...list, listName: e.target.elements[0].value}
        const response = await fetchData({
            type: "PUT",
            url: `http://localhost:8080/api/shopping-lists/${list.id}`,
            payload: newList,
            setIsLoading: setLoad
        });

        const listList = lists.map((item) => item.id === response.id ? response : item);

        if (response.id) {
            setLists(listList);
        } else {
            setErr(response);
        }
        
        onClose();
    };
    return (
        <div className={`${styles.editList} ${styles.modal}`}>
            <h2>Edit Shopping List</h2>
            <form className={styles.listForm} onSubmit={handleSubmit}>
                <div>
                    <input type="text" id="list-name" placeholder="List Name" defaultValue={list.listName} />
                </div>
                <div>
                    <button className={`${styles.submit} button-site-theme`} type="submit">Submit</button>
                    <CloseButton className="button-close-theme" onClose={onClose} />
                </div>
            </form>
        </div>
    );
}

function DeleteModal({onClose}) {

    return (
        <div className={`${styles.delete} ${styles.modal}`}>
            Delete
            <CloseButton className="button-close-theme" onClose={onClose} />
        </div>
    );
}



function Modal({modalState, onClose, setData}) {
    const {modalType, data} = modalState;

    return createPortal(
        <ModalOverlay> 
            {modalType === "add-book" && <AddBookModal onClose={onClose} data={data} setData={setData} />}
            {modalType === "edit-book" && <EditBookModal onClose={onClose} data={data} setData={setData} />}
            {modalType === "add-rec" && <AddRecipeModal onClose={onClose} data={data} setData={setData} />}
            {modalType === "edit-rec" && <EditRecipeModal onClose={onClose} data={data} setData={setData} />}
            {modalType === "add-ingr" && <AddIngredientModal onClose={onClose} data={data} setData={setData} />}
            {modalType === "edit-ingr" && <EditIngredientModal onClose={onClose} data={data} setData={setData} />}
            {modalType === "add-list" && <AddListModal onClose={onClose} data={data} setData={setData} />}
            {modalType === "edit-list" && <EditListModal onClose={onClose} data={data} setData={setData} />}
            {modalType === "delete" && <DeleteModal onClose={onClose} />}
        </ModalOverlay>,
        document.getElementById('root')
    );
}

function ModalOverlay({children}) {

    return (
        <div className={styles.overlay}>
            {children}
        </div>
    );
}

export default Modal;