/* eslint-disable import/no-cycle */
/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

interface IStatus {
  status?: "success" | "loading" | "error" | "";
}

const initialState: IStatus = {
  status: "",
};

const statusSlice = createSlice({
  name: "status",
  initialState,
  reducers: {
    changeStatus: (state, action) => {
      const status = action.payload as "success" | "loading" | "error" | "";
      state.status = status;
    },
    clearStatus: (state) => {
      state.status = "";
    },
  },
});

export const { changeStatus, clearStatus } = statusSlice.actions;

export default statusSlice.reducer;

export const getPresentStatus = (state: RootState) => state.status.status;
