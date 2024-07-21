import { createSlice } from "@reduxjs/toolkit";
import { IUser } from "./userInterface";

interface FilteredUser {
  // userData: Partial<IUser>[];
  filteredUser: Partial<IUser>[];
  //   rowPerPage: number;
  //   numberOfPage: number;
  //   currentPage: number;
}

const initialState: FilteredUser = {
  // userData: [],
  filteredUser: [],
  // rowPerPage: 0,
  // numberOfPage: 0,
  // currentPage: 0,
};

const userTableSlice = createSlice({
  name: "userTable",
  initialState,
  reducers: {
    setfilterUser: (state, action) => {
      state.filteredUser = [];
      state.filteredUser = action.payload as Partial<IUser>[];
    },
  },
});

export const { setfilterUser } = userTableSlice.actions;

export default userTableSlice.reducer;
