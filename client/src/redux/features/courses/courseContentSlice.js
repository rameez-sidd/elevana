import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    activeVideo: 0
}

const courseContentSlice = createSlice({
    name: 'courseContent',
    initialState,
    reducers: {
        IncrementByOne: (state) => {
            state.activeVideo += 1
        },
        DecrementByOne: (state) => {
            state.activeVideo -= 1
        },
        setActiveVideo: (state, action) => {
            state.activeVideo = action.payload
        }
    }
})

export const {IncrementByOne, DecrementByOne, setActiveVideo} = courseContentSlice.actions

export default courseContentSlice.reducer
