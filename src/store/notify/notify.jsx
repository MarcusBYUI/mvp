import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  notify: false,
};

const notifySlice = createSlice({
  name: "notify",
  initialState,
  reducers: {
    setNotify(state) {
      state.notify = !state.notify;
    },
  }
});

export const notifyActions = notifySlice.actions;

export default notifySlice;
