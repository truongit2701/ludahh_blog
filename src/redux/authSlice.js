import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
   name: 'auth',
   initialState: {
      login: {
         user: JSON.parse(localStorage.getItem('ludahh_auth')) || null,
      },
   },
   reducers: {
      loginSuccess: (state, action) => {
         state.login.user = action.payload;
         localStorage.setItem('ludahh_auth', JSON.stringify(action.payload));
      },
      logout: (state) => {
         state.login.user = null;
         localStorage.setItem('ludahh_auth', null);
      },

      updateAvatarRedux: (state, action) => {
         const auth = state.login.user;
         auth.avatar = action.payload;
         localStorage.setItem('ludahh_auth', JSON.stringify(auth));
      },

      updateInfoRedux: (state, action) => {
         const auth = state.login.user;
         auth.fullName = action.payload;
         localStorage.setItem('ludahh_auth', JSON.stringify(auth));
      },
   },
});

export const { loginSuccess, logout, updateAvatarRedux, updateInfoRedux } =
   authSlice.actions;

export default authSlice.reducer;
