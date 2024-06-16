/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";

const loaderSlice = createSlice({
  name: "loader",
  initialState: { isLoading: false },
  reducers: {
    setLoader: (state, action) => {
      const laoder = action.payload as boolean;
      state.isLoading = laoder;
    },
  },
});

export const { setLoader } = loaderSlice.actions;

export default loaderSlice.reducer;
