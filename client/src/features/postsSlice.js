import { createSlice } from '@reduxjs/toolkit';


const postsSlice = createSlice({
    name: 'post',
    initialState: {
        data: null,
    },
    reducers: {
        setPost: (state, { payload }) => {
            state.data = payload
        },
    }
});

export const { setPost } = postsSlice.actions;
export default postsSlice.reducer;