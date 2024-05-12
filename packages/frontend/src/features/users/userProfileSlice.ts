/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";
import { IUser } from "./userInterface";

const initialState = {
  userProfile: {},
};

const userProfileSlice = createSlice({
  name: "userProfile",
  initialState,
  reducers: {
    saveProfile: (state, action) => {
      const userProfile = action.payload as IUser;
      state.userProfile = userProfile;
    },
  },
});

export const { saveProfile } = userProfileSlice.actions;

export default userProfileSlice.reducer;
