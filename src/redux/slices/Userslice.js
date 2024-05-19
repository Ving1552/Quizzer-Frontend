import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        isUserLoggedIn: false,
        user: null,
        score: 0,
        requestedQuiz: ''
    },
    reducers: {
        userlogin: (state, action) => {
            state.isUserLoggedIn = true;
            state.user = action.payload;
        },
        userScore: (state, action) => {
            state.score = action.payload;
        },
        userRequestedQuiz: (state, action) => {
            state.requestedQuiz = action.payload;
        },
        userLogout: (state, action) => {
            state.isUserLoggedIn = false;
            state.user = null;
        }
    }
});
 
export const { userlogin } = userSlice.actions;
export const { userScore } = userSlice.actions;
export const { userRequestedQuiz } = userSlice.actions;
export const { userLogout } = userSlice.actions;

export const selectUser = (state) => state.user.user;
export const selectIsUserLoggedIn = (state) => state.user.isUserLoggedIn;
export const selectUserScore = (state) => state.user.score;
export const selectUserRequestedQuiz = (state) => state.user.requestedQuiz;

export default userSlice.reducer;