/* eslint-disable indent */
import { apiSlice } from "../../app/api/apislice";
import { Result } from "../../shared/interface/Result";
import { ISubtask } from "./subtaskInterface";

type SubtaskResponse = ISubtask[];

interface ResData {
  data: ISubtask[];
}

export const subtaskApiSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getSubtasks: build.query<SubtaskResponse, Record<string, string> | undefined>({
      query: (query) => {
        const filteredQuery = query as unknown as Record<string, string>;
        if (typeof filteredQuery == "object") {
          const stringifyQuery = JSON.stringify(filteredQuery);
          return {
            url: `/subtask/subtasks?filters=${stringifyQuery}`,
            validateStatus: (response, result: Result<ISubtask>) => response.status === 200 || !result?.isError,
          };
        }

        return {
          url: "/subtask/subtasks",
          validateStatus: (response, result: Result<ISubtask>) => response.status === 200 || !result?.isError,
        };
      },
      transformResponse: (responseData: ResData) => {
        let subtasks = responseData?.data;

        subtasks = subtasks.map((subtask: ISubtask) => ({
          ...subtask,
          _id: subtask.subtaskId,
        }));

        return subtasks;
      },
      providesTags: (result) =>
        result
          ? [
              ...result.map((task) => ({
                type: "Task" as const,
                id: task.taskId || "UNKNOWN", // Fallback in case taskId is undefined
              })),
              { type: "Tasks", id: "LIST" },
            ]
          : [{ type: "Tasks", id: "LIST" }],
    }),
    addSubtask: build.mutation({
      query: (subtaskData: Partial<ISubtask>) => ({
        url: "/subtask/create",
        method: "POST",
        body: subtaskData,
        validateStatus: (response, result: Result<ISubtask>) => response.status === 201 || !result.isError,
      }),
      invalidatesTags: [
        { type: "Subtasks" as const, id: "LIST" as const },
        { type: "Tasks" as const, id: "LIST" as const },
      ],
    }),
    updateSubtask: build.mutation({
      query: (data) => ({
        url: "/subtask/create",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Subtask"],
    }),
    deleteSubtask: build.mutation({
      query: (id) => ({
        url: `/subtask/subtask/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Subtask"],
    }),
  }),
});

export const { useGetSubtasksQuery, useAddSubtaskMutation, useUpdateSubtaskMutation, useDeleteSubtaskMutation } =
  subtaskApiSlice;
