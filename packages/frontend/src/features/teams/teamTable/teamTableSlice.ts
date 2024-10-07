import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  pagination: {
    rowsPerPage: 5,
    currentPage: 1,
    totalRows: 0,
  },
};

const teamTableSlice = createSlice({
  name: "teamTable",
  initialState,
  reducers: {
    setRowsPerPage: (state, action) => ({
      ...state,
      pagination: {
        ...state.pagination,
        rowsPerPage: typeof action.payload === "number" ? action.payload : 0,
      },
    }),
    setCurrentPage: (state, action) => ({
      ...state,
      pagination: {
        ...state.pagination,
        currentPage: typeof action.payload === "number" ? action.payload : 0,
      },
    }),
    setTotalRows: (state, action) => ({
      ...state,
      pagination: {
        ...state.pagination,
        totalRows: typeof action.payload === "number" ? action.payload : 0,
      },
    }),
  },
});

export const { setRowsPerPage, setCurrentPage, setTotalRows } = teamTableSlice.actions;

export default teamTableSlice.reducer;
