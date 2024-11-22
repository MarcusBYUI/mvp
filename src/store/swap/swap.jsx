import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    tokens: [],
    refresh: true

};

const swap = createSlice({
    name: "swap",
    initialState,
    reducers: {
        setTokens(state, action) {
            state.tokens = action.payload;
        },
        setRefresh(state) {
            state.refresh = !state.refresh;
        },
        updateTokens(state, action) {
            state.tokens.push(action.payload);
        },
    },
});

export const swapActions = swap.actions;

export default swap;
