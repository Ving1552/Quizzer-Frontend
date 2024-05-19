import { createSlice } from "@reduxjs/toolkit";

export const adminSlice = createSlice({
    name: 'admin',
    initialState: {
        isAdminLoggedIn: false,
        admin: null,
        selectedQuestionId: 0
    },
    reducers: {
        adminlogin: (state, action) => {
            state.isAdminLoggedIn = true;
            state.admin = action.payload;
        },
        updateSelectedQuestion: (state, action) => {
            state.isAdminLoggedIn = true;
            state.selectedQuestionId = action.payload;
        },
        adminLogout: (state, action) => {
            state.isAdminLoggedIn = false;
            state.admin = null;
        }
    }
});

export const { adminlogin } = adminSlice.actions;
export const { updateSelectedQuestion } = adminSlice.actions;
export const { adminLogout } = adminSlice.actions;

export const selectAdmin = (state) => state.admin.admin;
export const selectIsAdminLoggedIn = (state) => state.admin.isAdminLoggedIn;
export const selectSelectedQuestionId = (state) => state.admin.selectedQuestionId;

export default adminSlice.reducer;