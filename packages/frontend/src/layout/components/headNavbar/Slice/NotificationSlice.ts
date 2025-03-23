/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showNotifications: false,
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setShowNotifications: (state) => {
      state.showNotifications ? (state.showNotifications = false) : (state.showNotifications = true);
    },
    setShowNotificationsFalse: (state) => {
      state.showNotifications = false;
    },
  },
});

export const { setShowNotifications, setShowNotificationsFalse } = notificationSlice.actions;

export const selectShowNotifications = (state: { notification: { showNotifications: boolean } }) =>
  state.notification.showNotifications;

export default notificationSlice.reducer;
