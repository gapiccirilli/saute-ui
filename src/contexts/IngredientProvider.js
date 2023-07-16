import { createContext, useReducer } from "react";

const IngredientContext = createContext();

function reducer(state, action) {

    switch(action.type) {
        case "ingredients/retrieved":
            return { ...state, ingredients: action.payload };
        case "ingredient/created":
            ingredientList = [...state.ingredients, action.payload];
            return { ingredients: ingredientList, ingredient: action.payload };
        case "ingredient/edited":
            ingredientList = state.ingredients.map(ingredient => ingredient.id === action.payload.id ? action.payload : ingredient)
            return { ingredients: ingredientList, ingredient: action.payload };
        case "error":
            return { ...state, error: action.payload};
        default:
            throw new Error("Unknown Action Type");
    }
}

function IngredientProvider({children}) {

    const initialState = {
        ingredients: [],
        ingredient: {},
        error: ""
    };
    const [ingredientState, dispatch] = useReducer(reducer, initialState);
    return (
        <IngredientContext.Provider values={{ingredientState: ingredientState, dispatch: dispatch}}>
            {children}
        </IngredientContext.Provider>
    );
}

export {IngredientProvider, IngredientContext};