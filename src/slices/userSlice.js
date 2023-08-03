
const initialUserState = {
    firstName: null,
    lastName: null,
    email: null,
    phoneNumber: null,
    profilePicture: null,
    isAuthenticated: false,
    isLoading: false,
    createAuthError: null,
    loginAuthError: null
};

export default function userReducer(state = initialUserState, action) {
    switch (action.type) {
        case "user/login":
            return {...state, firstName: action.payload.firstName, lastName: action.payload.lastName, 
                email: action.payload.email, phoneNumber: action.payload.phoneNumber, 
                profilePicture: action.payload.profilePicture, isAuthenticated: action.payload.isAuthenticated, 
                isLoading: false, createAuthError: null, loginAuthError: null};
        case "user/create":
            return {...state, firstName: action.payload.firstName, lastName: action.payload.lastName, 
                email: action.payload.email, phoneNumber: action.payload.phoneNumber, 
                profilePicture: action.payload.profilePicture,
                isLoading: false, createAuthError: null, loginAuthError: null};
        case "user/logout":
            return {...state, firstName: null, lastName: null, 
                email: null, phoneNumber: null,
                profilePicture: null, isAuthenticated: false,
                isLoading: false, createAuthError: null, loginAuthError: null};
        case "user/createAuthFail":
            return {...state, createAuthError: action.payload};
        case "user/loginAuthFail":
            return {...state, loginAuthError: action.payload};
        case "user/loading":
            return {...state, isLoading: true};
        default:
            return state;
    }   
}

export async function login(email, password) {


    return async function(dispatch, getState) {
        // API CALL
        try {
            dispatch({ type: "user/loading" });
            const response = await fetch("http://localhost:8080/api/users/login", {method: "POST", 
            headers: {"Content-Type": "application/json"}, body: JSON.stringify({email, password})});

            if (!response.ok) {
                const errorMessage = await response.json();
                throw new Error(errorMessage.message);
            }

            const data = await response.json();
            dispatch({ type: "user/login", payload: { ...data, isAuthenticated: true } });
        } catch(err) {
            dispatch({ type: "user/loginAuthFail", payload: "Email or password is incorrect"});
        }
    };
}

export async function create(user) {
    
    return async function(dispatch, getState) {
        try {
            dispatch({ type: "user/loading" });
            const response = await fetch("http://localhost:8080/api/users/register", {method: "POST", 
            headers: {"Content-Type": "application/json"}, body: JSON.stringify(user)});

            if (!response.ok) {
                const errorMessage = await response.json();
                throw new Error(errorMessage.message);
            }

            const data = await response.json();
            dispatch({ type: "user/create", payload: { ...data } });
        } catch(err) {
            dispatch({ type: "user/createAuthFail", payload: err.message});
        }
    }
}

export function createAuthFail(error) {
    return { type: "user/createAuthFail", payload: error};
}

export function loginAuthFail(error) {
    return { type: "user/loginAuthFail", payload: error};
}

export function logout() {
    return { type: "user/logout" };
}