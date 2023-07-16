import { createContext, useReducer } from "react";

const IngredientModalContext = createContext();

// function reducer(state, action) {

//     switch(action.type) {
//         case "ingredient/created":
//             return { ingredients: [...state.ingredients, action.payload], ingredient: action.payload };
//         case "ingredient/edited":
//             const ingredientList = state.ingredients.map(
//                 ingredient => ingredient.id === action.payload.id ? action.payload : ingredient);
//             return { ingredients: ingredientList, ingredient: action.payload };
//         case "error":
//             return { ...state, error: action.payload};
//         default:
//             throw new Error("Unknown Action Type: Ingredient Context");
//     }
// }

function IngredientModalProvider({children, ingredientState}) {

    // const initialState = {
    //     ingredients: [],
    //     ingredient: {},
    //     error: ""
    // };
    // const [ingredientState, dispatch] = useReducer(reducer, initialState);
    return (
        <IngredientModalContext.Provider value={ingredientState}>
            {children}
        </IngredientModalContext.Provider>
    );
}

export { IngredientModalProvider, IngredientModalContext };