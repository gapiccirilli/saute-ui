import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    firstName: null,
    lastName: null,
    email: null,
    phoneNumber: null,
    gender: null,
    profilePicture: null
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        login: {
            prepare(email, password) {
                return {
                    payload: { email, password }
                };
            },

            reducer(state, action) {
            state.firstName = action.payload.firstName;
            state.lastName = action.payload.lastName;
            state.email = action.payload.email;
            state.phoneNumber = action.payload.phoneNumber;
            state.gender = action.payload.gender;
            state.profilePicture = action.payload.profilePicture;
        }},
        create: {
            prepare(user) {
                return {
                    payload: {
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    phoneNumber: user.phoneNumber,
                    gender: user.gender,
                    profilePicture: user.profilePicture
                }
            }
            },

            reducer(state, action) {
            state.firstName = action.payload.firstName;
            state.lastName = action.payload.lastName;
            state.email = action.payload.email;
            state.phoneNumber = action.payload.phoneNumber;
            state.gender = action.payload.gender;
            state.profilePicture = action.payload.profilePicture;
        }},
        logout(state, action) {
            state.firstName = null;
            state.lastName = null;
            state.email = null;
            state.phoneNumber = null;
            state.gender = null;
            state.profilePicture = null;
        }
    },
});

export const { login, create, logout } = userSlice.actions;

export default userSlice.reducer;

// export default function userReducer(state = initialUserState, action) {
//     switch (action.type) {
//         case "user/login":
//             return {...state, firstName: action.payload.firstName, lastName: action.payload.lastName, 
//                 email: action.payload.email, phoneNumber: action.payload.phoneNumber, gender: action.payload.gender,
//                 profilePicture: action.payload.profilePicture};
//         case "user/create":
//             return {...state, firstName: action.payload.firstName, lastName: action.payload.lastName, 
//                 email: action.payload.email, phoneNumber: action.payload.phoneNumber, gender: action.payload.gender,
//                 profilePicture: action.payload.profilePicture};
//         case "user/logout":
//             return {...state, firstName: null, lastName: null, 
//                 email: null, phoneNumber: null, gender: null,
//                 profilePicture: null};
//     }   
// }