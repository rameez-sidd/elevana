import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
    activeVideos: [],
}

const courseContentSlice = createSlice({
    name: 'courseContent',
    initialState,
    reducers: {
        setActiveVideos: (state, action) => {
            const { id, currentVideo } = action.payload
            if (!state.activeVideos) {
                state.activeVideos = []
            }
            const existingVideo = state.activeVideos.find(video => video.id === id)
            if (existingVideo) {
                existingVideo.currentVideo = currentVideo
            } else {
                state.activeVideos.push({ id, currentVideo })
            }
        },
        incrementCurrentVideo: (state, action) => {
            const { id } = action.payload;
            if (!state.activeVideos) {
                state.activeVideos = [];
            }

            const existingIndex = state.activeVideos.findIndex(video => video.id === id);

            if (existingIndex !== -1) {
                state.activeVideos[existingIndex].currentVideo += 1;
            } else {
                state.activeVideos.push({ id, currentVideo: 1 });
            }
        },
        decrementCurrentVideo: (state, action) => {
            const { id } = action.payload;
            if (!state.activeVideos) {
                state.activeVideos = [];
            }

            const existingIndex = state.activeVideos.findIndex(video => video.id === id);

            if (existingIndex !== -1) {
                if (state.activeVideos[existingIndex].currentVideo > 0) {
                    state.activeVideos[existingIndex].currentVideo -= 1;
                }
            } else {
                state.activeVideos.push({ id, currentVideo: 0 });
            }
        },
    }
})

export const { IncrementByOne, DecrementByOne, setActiveVideo, setActiveVideos, incrementCurrentVideo, decrementCurrentVideo } = courseContentSlice.actions

export default courseContentSlice.reducer
