/* eslint-disable import/no-cycle */
/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";
import { IUser } from "./userInterface";

interface UserProfile {
  userProfile: Partial<IUser>;
}

const initialState: UserProfile = {
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
