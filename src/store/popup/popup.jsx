import { createSlice } from "@reduxjs/toolkit";

const initialState = {
salePopUp : false,
headerPopUp : false


};

const popup = createSlice({
  name: "popup",
  initialState,
  reducers: {
    setSalePop(state, action) {
      state.salePopUp = action.payload;
    },
    setHeaderPop(state, action) {
      state.headerPopUp = action.payload;
    },
  },
});

export const popupActions = popup.actions;

export default popup;
