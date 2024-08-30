/* eslint-disable import/no-cycle */
import { createSlice } from "@reduxjs/toolkit";
// import { usersAdapter } from "./userApiSlice";
import { RootState } from "../../app/store";
import { IUser } from "./userInterface";
import { usersAdapter } from "./userApiSlice";

const usersSlice = createSlice({
  name: "users",
  initialState: usersAdapter.getInitialState(),
  reducers: {
    // usersAdded: usersAdapter.addOne,
    setUsers(state, action) {
      const users = action.payload as Record<string, IUser> | readonly IUser[];
      // console.log(users);
      usersAdapter.setAll(state, users);
    },
  },
});

export const { setUsers } = usersSlice.actions;

export const usersSelectors = usersAdapter.getSelectors<RootState>((state) => state.users);

export default usersSlice.reducer;
