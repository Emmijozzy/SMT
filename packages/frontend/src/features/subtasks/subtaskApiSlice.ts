/* eslint-disable indent */
import { apiSlice } from "../../app/api/apislice";
import { ResApiData } from "../../shared/interface/resApiData";
import { Result } from "../../shared/interface/Result";
import log from "../../shared/utils/log";
import { InReviewFeedBackData, InReviewUpdateData, ISubtask, SubtaskLog } from "./subtaskInterface";
import { setSubtasks } from "./subtaskSlice";

type SubtaskResponse = ISubtask[];

interface ResData<T> {
  data: T;
  message: string;
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
      transformResponse: (responseData: ResData<SubtaskResponse>) => {
        let subtasks = responseData?.data;

        subtasks = subtasks.map((subtask: ISubtask) => ({
          ...subtask,
          _id: subtask.subtaskId,
        }));

        return subtasks;
      },
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setSubtasks(data));
        } catch (e: unknown) {
          const error = e as Error;
          log("error", "Subtask Api Error", error.message, error.stack as string);
        }
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
    getSubtask: build.query<ISubtask, string>({
      query: (subtaskId) => ({
        url: `/subtask/${subtaskId}`,
        validateStatus: (response, result: Result<ISubtask>) => response.status === 200 || !result.isError,
      }),
      transformResponse: (responseData: ResApiData<ISubtask>) => {
        const subtask = responseData?.data as ISubtask;

        return {
          ...subtask,
          _id: subtask.subtaskId,
        };
      },
      providesTags: (_result, _error, arg) => [{ type: "Subtasks", id: arg }],
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
        { type: "Teams" as const, id: "LIST" as const },
      ],
    }),
    updateSubtask: build.mutation({
      query: (data: Partial<ISubtask>) => ({
        url: "/subtask",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (_result, _error, arg: ISubtask) => [
        { type: "Subtask", id: arg?.subtaskId },
        { type: "Subtasks" as const, id: "LIST" as const },
        { type: "Tasks" as const, id: "LIST" as const },
      ],
    }),
    updateSubtaskStatus: build.mutation({
      query: (data: { subtaskId: string; status: string }) => ({
        url: `/subtask/status/${data.subtaskId || ""}`,
        method: "PUT",
        body: { status: data.status },
      }),
      invalidatesTags: (_result, _error, arg) => [
        { type: "Subtask", id: arg?.subtaskId },
        { type: "Subtasks" as const, id: "LIST" as const },
        { type: "Tasks" as const, id: "LIST" as const },
      ],
    }),
    updateSubtaskOpenToInProcess: build.mutation({
      query: (data: { subtaskId: string }) => ({
        url: `/subtask/${data.subtaskId || ""}/open-to-in-process`,
        method: "PUT",
      }),
      invalidatesTags: (_result, _error, arg) => [
        { type: "Subtask", id: arg?.subtaskId },
        { type: "Subtasks" as const, id: "LIST" as const },
        { type: "Tasks" as const, id: "LIST" as const },
        { type: "SubtaskLogs" as const, id: "LIST" as const },
      ],
    }),
    updateSubtaskToInReview: build.mutation({
      query: (data: { subtaskId: string; body: InReviewUpdateData }) => ({
        url: `/subtask/${data.subtaskId || ""}/to-in-review`,
        method: "PUT",
        body: data.body,
      }),
      invalidatesTags: (_result, _error, arg) => [
        { type: "Subtask", id: arg?.subtaskId },
        { type: "Subtasks" as const, id: "LIST" as const },
        { type: "Tasks" as const, id: "LIST" as const },
        { type: "SubtaskLogs" as const, id: "LIST" as const },
      ],
    }),
    updateSubtaskInReviewToRevisit: build.mutation({
      query: (data: { subtaskId: string; body: InReviewFeedBackData }) => ({
        url: `/subtask/${data.subtaskId || ""}/in-review-to-revisit`,
        method: "PUT",
        body: data.body,
      }),
      invalidatesTags: (_result, _error, arg) => [
        { type: "Subtask", id: arg?.subtaskId },
        { type: "Subtasks" as const, id: "LIST" as const },
        { type: "Tasks" as const, id: "LIST" as const },
        { type: "SubtaskLogs" as const, id: "LIST" as const },
      ],
    }),
    updateSubtaskInReviewToComplete: build.mutation({
      query: (data: { subtaskId: string; body: InReviewFeedBackData }) => ({
        url: `/subtask/${data.subtaskId || ""}/in-review-to-completed`,
        method: "PUT",
        body: data.body,
      }),
      invalidatesTags: (_result, _error, arg) => [
        { type: "Subtask", id: arg?.subtaskId },
        { type: "Subtasks" as const, id: "LIST" as const },
        { type: "Tasks" as const, id: "LIST" as const },
        { type: "SubtaskLogs" as const, id: "LIST" as const },
      ],
    }),
    deleteSubtask: build.mutation<unknown, string>({
      query: (id: string) => ({
        url: `/subtask/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, arg) => [
        { type: "Subtask", id: arg },
        { type: "Subtasks" as const, id: "LIST" as const },
        { type: "Tasks" as const, id: "LIST" as const },
        { type: "SubtaskLogs" as const, id: "LIST" as const },
      ],
    }),
    getSubtaskAuditLogs: build.query<ResData<SubtaskLog>, string>({
      query: (subtaskId) => ({
        url: `/subtask/${subtaskId}/audit-logs`,
        validateStatus: (response, result: Result<ISubtask>) => response.status === 200 || !result.isError,
      }),
      providesTags: (_result, _error, arg) => [{ type: "Subtasks", id: arg }],
    }),
  }),
});

export const {
  useGetSubtasksQuery,
  useGetSubtaskQuery,
  useAddSubtaskMutation,
  useUpdateSubtaskMutation,
  useDeleteSubtaskMutation,
  useUpdateSubtaskStatusMutation,
  useUpdateSubtaskOpenToInProcessMutation,
  useUpdateSubtaskToInReviewMutation,
  useUpdateSubtaskInReviewToRevisitMutation,
  useUpdateSubtaskInReviewToCompleteMutation,
  useGetSubtaskAuditLogsQuery,
} = subtaskApiSlice;
