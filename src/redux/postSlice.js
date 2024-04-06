import { createSlice } from '@reduxjs/toolkit';

const postSlice = createSlice({
   name: 'list-post',
   initialState: {
      item: [],
   },
   reducers: {
      saveListPost: (state, action) => {
         state.item = action.payload;
         localStorage.setItem('list-post', action.payload);
      },
   },
});

export const { saveListPost } = postSlice.actions;

export default postSlice.reducer;
