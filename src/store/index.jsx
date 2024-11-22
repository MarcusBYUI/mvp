import { configureStore } from "@reduxjs/toolkit";
import popupSlice from "./popup/popup";
import notificationSlice from "./notification/notification";
import notifySlice from "./notify/notify";
import swap from "./swap/swap";

const store = configureStore({
    reducer: {
        popup: popupSlice.reducer,
        swap: swap.reducer,
        notification: notificationSlice.reducer,
        notify: notifySlice.reducer,
    },
});

export default store;