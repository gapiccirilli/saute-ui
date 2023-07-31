
const initialUserState = {
    firstName: null,
    lastName: null,
    email: null,
    phoneNumber: null,
    gender: null,
    profilePicture: null,
    isAuthenticated: false,
    isLoading: false,
    authError: null
};

export default function userReducer(state = initialUserState, action) {
    switch (action.type) {
        case "user/login":
            return {...state, firstName: action.payload.firstName, lastName: action.payload.lastName, 
                email: action.payload.email, phoneNumber: action.payload.phoneNumber, gender: action.payload.gender,
                profilePicture: action.payload.profilePicture, isAuthenticated: action.payload.isAuthenticated, 
                isLoading: false, authError: null};
        case "user/create":
            return {...state, firstName: action.payload.firstName, lastName: action.payload.lastName, 
                email: action.payload.email, phoneNumber: action.payload.phoneNumber, gender: action.payload.gender,
                profilePicture: action.payload.profilePicture, isAuthenticated: action.payload.isAuthenticated,
                isLoading: false, authError: null};
        case "user/logout":
            return {...state, firstName: null, lastName: null, 
                email: null, phoneNumber: null, gender: null,
                profilePicture: null, isAuthenticated: false,
                isLoading: false, authError: null};
        case "user/authFail":
            return {...state, authError: action.payload};
        case "user/loading":
            return {...state, isLoading: true};
        default:
            return state;
    }   
}

export function login(email, password) {


    return async function(dispatch, getState) {
        // API CALL
        try {
            dispatch({ type: "user/loading" });
            const response = await fetch("url", {method: "POST", headers: {"Content-Type": "application/json"}, 
            body: JSON.stringify(payload)});

            if (!response.ok) {
                const errorMessage = await response.json();
                throw new Error(errorMessage.message);
            }

            const data = await response.json();
            dispatch({ type: "user/login", payload: { ...data, isAuthenticated: true } });
        } catch(err) {
            dispatch({ type: "user/authFail", payload: "Email or password is incorrect"});
        }
    };
}

export function create(user) {
    
    return async function(dispatch, getState) {
        try {
            dispatch({ type: "user/loading" });
            const response = await fetch("url", {method: "POST", headers: {"Content-Type": "application/json"}, 
            body: JSON.stringify(user)});

            if (!response.ok) {
                const errorMessage = await response.json();
                throw new Error(errorMessage.message);
            }

            const data = await response.json();
            dispatch({ type: "user/create", payload: { ...data } });
        } catch(err) {
            dispatch({ type: "user/authFail", payload: err.message});
        }
    }
}

export function logout() {
    return { type: "user/logout" };
}