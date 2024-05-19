import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../redux/slices/Userslice';
import adminReducer from '../redux/slices/Adminslice';

export const store = configureStore({
    reducer: {
        user: userReducer,
        admin: adminReducer
    }
});