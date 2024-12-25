import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { ISubtask } from "./subtaskInterface";

export const subtaskAdapter = createEntityAdapter({
  selectId: (subtask: ISubtask) => subtask.subtaskId,
});
const subtasksSlice = createSlice({
  name: "subtasks",
  initialState: subtaskAdapter.getInitialState(),
  reducers: {
    setSubtasks(state, action) {
      const subtasks = (action.payload as Record<string, ISubtask> | readonly ISubtask[]) || [];
      subtaskAdapter.setAll(state, subtasks);
    },
  },
});
export const { setSubtasks } = subtasksSlice.actions;
export default subtasksSlice.reducer;

export const subtasksSelectors = subtaskAdapter.getSelectors(
  (state: { subtasks: ReturnType<typeof subtaskAdapter.getInitialState> }) => state.subtasks,
);
