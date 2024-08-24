/* eslint-disable import/no-cycle */
/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../../app/store";

interface DeLUser {
  userId: string;
  forDelete: boolean;
}

const initialState = {
  userId: "",
  showModal: false,
  forDelete: true,
};

const deleteUserSlice = createSlice({
  name: "deleteUser",
  initialState,
  reducers: {
    setShowModal: (state) => {
      state.showModal = true;
    },
    setCloseModal: (state) => {
      state.showModal = false;
      state.userId = "";
    },
    setUserId: (state, { payload }) => {
      const { userId, forDelete } = payload as DeLUser;
      state.userId = userId;
      state.forDelete = forDelete;
    },
  },
});

export const { setCloseModal, setShowModal, setUserId } = deleteUserSlice.actions;

export const getUserId = (state: RootState) => state.deleteUser.userId;

export const getShowModal = (state: RootState) => state.deleteUser.showModal;

export default deleteUserSlice.reducer;
