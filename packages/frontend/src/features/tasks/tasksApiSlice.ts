/* eslint-disable indent */
import { ITask } from "./tasksInterface";
import { apiSlice } from "../../app/api/apislice";

type TaskResponse = ITask[];

interface ResData {
  data: ITask[];
}

type Result = {
  data: ITask[];
  isSuccess: boolean;
  isError: boolean;
  message: string;
  statusCode: number;
};

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
            url: `/tasks_admin/tasks?filters=${stringifyQuery}`,
            validateStatus: (response, result: Result) => response.status === 200 || !result?.isError,
          };
        }
        return {
          url: "/tasks_admin/tasks",
          validateStatus: (response, result: Result) => response.status === 200 || !result.isError,
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

export const { useCreateTaskMutation, useGetTasksQuery } = tasksApiSlice;
