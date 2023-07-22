import { createContext, useContext, useReducer } from "react";
import { fetchData } from "../hooks/fetch";

const AuthContext = createContext();

function reducer(state, action) {
    switch(action.type) {
        case "login":
            return {...state, user: action.payload, isAuthenticated: true};
        case "logout":
            return {...state, user: null, isAuthenticated: false};
        default:
            throw new Error(`Action '${action.type}' is not a valid auth action`);
    }
}

function AuthProvider({ children }) {

    const initialState = {
        user: null,
        isAuthenticated: false
    };

    const [{user, isAuthenticated}, dispatch] = useReducer(reducer, initialState);

    function login(email, password) {
        
    }

    function logout() {}

    return <AuthContext.Provider value={{ user, isAuthenticated, login, logout}}>{children}</AuthContext.Provider>
}

function useAuth() {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error("AuthContext should not be used outside of AuthProvider");
    }
}

export { AuthProvider, useAuth };