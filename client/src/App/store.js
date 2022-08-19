import { configureStore } from '@reduxjs/toolkit';
import usersSlice from '../features/usersSlice';
import postsSlice from '../features/postsSlice'




export default configureStore({
    reducer: {
        user: usersSlice,

    },
})