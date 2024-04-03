import { createSlice } from '@reduxjs/toolkit';

const navbarSlice = createSlice({
   name: 'navbar',
   initialState: {
      item: JSON.parse(localStorage.getItem('auth')) || null,
   },
   reducers: {
      saveNav: (state, action) => {
         state.login.user = action.payload;
         localStorage.setItem('ludahh_auth', JSON.stringify(action.payload));
      },
      removeNav: (state) => {
         state.login.user = null;
         localStorage.setItem('ludahh_auth', null);
      },
   },
});

export const { loginSuccess, logout } = navbarSlice.actions;

export default navbarSlice.reducer;
