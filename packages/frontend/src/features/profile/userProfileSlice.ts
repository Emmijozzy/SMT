/* eslint-disable import/no-cycle */
/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { IUser } from "../users/userInterface";

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
    removeProfile: (state) => {
      state.userProfile = {};
    },
  },
});

export const { saveProfile, removeProfile } = userProfileSlice.actions;

export default userProfileSlice.reducer;

export const getPresentUser = (state: RootState) => state.userProfile.userProfile;
