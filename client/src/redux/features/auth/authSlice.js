import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    token: "",
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers:{
        userRegistration: (state, action) => {
            state.token = action.payload.token
        },
        userLoggedIn: (state, action) => {
            state.user = action.payload.user
            state.token = action.payload.token
        },
        userLoggedOut: (state) => {
            state.user = null
            state.token = ""
        },
        setUser: (state, action) => {
            state.user = action.payload.user;  
        } 
    }
})

export const {userRegistration, userLoggedIn, setUser, userLoggedOut} = authSlice.actions
export default authSlice.reducer