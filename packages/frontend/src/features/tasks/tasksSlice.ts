/* eslint-disable import/no-cycle */
import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { ITask } from "./tasksInterface";
import { RootState } from "../../app/store";

export const taskAdapter = createEntityAdapter({
  selectId: (task: ITask) => task.taskId as string,
});

const tasksSlice = createSlice({
  name: "tasks",
  initialState: taskAdapter.getInitialState(),
  reducers: {
    setTasks(state, action) {
      const tasks = (action.payload as Record<string, ITask> | readonly ITask[]) || [];
      taskAdapter.setAll(state, tasks);
    },
  },
});

export const { setTasks } = tasksSlice.actions;

export default tasksSlice.reducer;

export const tasksSelectors = taskAdapter.getSelectors<RootState>((state) => state.tasks);
