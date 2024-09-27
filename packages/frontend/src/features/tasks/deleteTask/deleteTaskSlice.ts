/* eslint-disable import/no-cycle */
/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../../app/store";

interface DeLUser {
  taskId: string;
  forDelete: boolean;
}

const initialState = {
  taskId: "",
  showModal: false,
  forDelete: true,
};

const deleteTaskSlice = createSlice({
  name: "deleteTask",
  initialState,
  reducers: {
    setShowModal: (state) => {
      state.showModal = true;
    },
    setCloseModal: (state) => {
      state.showModal = false;
      state.taskId = "";
    },
    setTaskId: (state, { payload }) => {
      const { taskId, forDelete } = payload as DeLUser;
      state.taskId = taskId;
      state.forDelete = forDelete;
    },
  },
});

export const { setCloseModal, setShowModal, setTaskId } = deleteTaskSlice.actions;

export const getTaskId = (state: RootState) => state.deleteTask.taskId;

export const getShowModal = (state: RootState) => state.deleteTask.showModal;

export default deleteTaskSlice.reducer;
