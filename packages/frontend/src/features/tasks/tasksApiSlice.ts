/* eslint-disable import/no-cycle */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { createEntityAdapter } from "@reduxjs/toolkit";
import { ITask } from "./tasksInterface";
import { apiSlice } from "../../app/api/apislice";

type TaskResponse = ITask[];

interface ResData {
  data: ITask[];
}

export const tasksApiSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    createTask: build.mutation({
      query: (taskData: ITask) => ({
        url: "tasks_admin/create",
        method: "POST",
        body: { ...taskData },
      }),
    }),
    
    getTasks: build.query<TaskResponse, void>({
      query: (query) => {
        const filteredQuery = query as unknown as Record<string, string>;

        if (typeof filteredQuery == "object") {
          const stringifyQuery = JSON.stringify(filteredQuery);
          return {
            url: `/tasks_admin/task?filters=${stringifyQuery}`,
            validateStatus: (response, result) => response.status === 200 || !result.isError,
          };
        }
        return {
          url: "/tasks_admin/task",
          validateStatus: (response, result) => response.status === 200 || !result.isError,
        };
      },
      transformResponse: (responseData: ResData) => {
        let tasks = responseData?.data;

        tasks = tasks.map((task: ITask) => ({
          ...task,
          _id: task.taskId,
        }));

        return tasks;
      },
      providesTags: (result) =>
        result
          ? [
              ...result.map((task) => ({
                type: "Tasks" as const,
                id: task.taskId || "UNKNOWN", // Fallback in case taskId is undefined
              })),
              { type: "Tasks", id: "LIST" },
            ]
          : [{ type: "Tasks", id: "LIST" }],
    }),
  }),
});

export const {useCreateTaskMutation, useGetTasksQuery} = tasksApiSlice;