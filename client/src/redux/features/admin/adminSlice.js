import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  activePage: 'dashboard', // default page
  openSidebar: true // default sidebar state
};

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    setActivePage: (state, action) => {
      state.activePage = action.payload;
    },
    setOpenSidebar: (state, action) => {
      state.openSidebar = action.payload;
    },
    resetAdmin: (state) => {
      return initialState;
    }
  }
});

export const { setActivePage, setOpenSidebar, resetAdmin } = adminSlice.actions;
export default adminSlice.reducer; 