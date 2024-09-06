/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // tasks: [],
  pagination: {
    rowsPerPage: 5,
    currentPage: 1,
    totalRows: 0,
  },
};

const tasksTasbleSlice = createSlice({
  name: "tasksTable",
  initialState,
  reducers: {
    // uploadTasks: (state, action) => {
    //   const tasks = action.payload;
    //   state.tasks = tasks;
    // },
    setRowsPerPage: (state, action) => {
      state.pagination.rowsPerPage = typeof action.payload == "number" ? action.payload : 0;
    },
    setCurrentPage: (state, action) => {
      // console.log(action.payload);
      state.pagination.currentPage = typeof action.payload == "number" ? action.payload : 0;
    },
    setTotalRows: (state, action) => {
      state.pagination.totalRows = typeof action.payload == "number" ? action.payload : 0;
    },
  },
});

export const { setRowsPerPage, setCurrentPage, setTotalRows } = tasksTasbleSlice.actions;

export default tasksTasbleSlice.reducer;
