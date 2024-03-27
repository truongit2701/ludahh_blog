import { createSlice } from '@reduxjs/toolkit';

const postSlice = createSlice({
   name: 'post',
   initialState: {
      item: null,
   },
   reducers: {
      fetchMainPost: (state, action) => {
         state.item = action.payload;
      },
   },
});

export const { fetchMainPost } = postSlice.actions;

export default postSlice.reducer;
