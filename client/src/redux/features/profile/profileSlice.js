import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  activePage: 'myAccount' // default page
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setActivePage: (state, action) => {
      state.activePage = action.payload;
    }
  }
});

export const { setActivePage } = profileSlice.actions;
export default profileSlice.reducer; 