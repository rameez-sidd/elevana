import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    token: "",
    modalOpen: "",
    socialAuth: false,
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
            state.socialAuth = action.payload.socialAuth
        },
        userLoggedOut: (state) => {
            state.user = null
            state.token = ""
            state.socialAuth = false
        },
        setUser: (state, action) => {
            state.user = action.payload.user;  
        },
        setModalOpen: (state, action) => {
            state.modalOpen = action.payload
        },
    }
})

export const {userRegistration, userLoggedIn, setUser, userLoggedOut, setModalOpen} = authSlice.actions
export default authSlice.reducer