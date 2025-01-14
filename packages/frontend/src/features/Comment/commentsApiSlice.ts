import { apiSlice } from "../../app/api/apislice";
import { ResApiData } from "../../shared/interface/resApiData";
import { CommentData, CommentType } from "./commentInterface";

type CommentResponse = CommentType[];

export const commentApiSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    createComment: build.mutation<CommentType, CommentData>({
      query: (commentData) => ({
        url: "comment/create",
        method: "POST",
        body: commentData,
      }),
      invalidatesTags: [
        { type: "Comments", id: "LIST" },
        { type: "Subtasks", id: "LIST" },
      ],
    }),

    getComments: build.query<CommentResponse, unknown>({
      query: (filters) => {
        const filteredQuery = filters as Record<string, string>;
        if (typeof filteredQuery == "object") {
          const stringifyQuery = JSON.stringify(filteredQuery);
          return {
            url: `/comment/comments?filters=${stringifyQuery}`,
            validateStatus: (response) => response.status === 200,
          };
        }
        return {
          url: "/comment/comments",
          validateStatus: (response) => response.status === 200,
        };
      },
      transformResponse: (responseData: ResApiData<CommentType>) => {
        let comments: CommentType[] = Array.isArray(responseData?.data) ? responseData?.data : [];

        comments = comments.map((comment) => ({
          ...comment,
          _id: comment.commentId,
        }));

        return comments;
      },
    }),

    getCommentById: build.query<CommentType, string>({
      query: (commentId) => ({
        url: `/comment/${commentId}`,
        validateStatus: (response) => response.status === 200,
      }),
      transformResponse: (responseData: ResApiData<CommentType>) => {
        let comment = responseData?.data as CommentType;

        comment = {
          ...comment,
          _id: comment.commentId,
        };

        return comment;
      },
    }),

    getCommentBySubtaskId: build.query<CommentResponse, string>({
      query: (subtaskId) => ({
        url: `/comment/${subtaskId}`,
        validateStatus: (response) => response.status === 200,
      }),
      transformResponse: (responseData: ResApiData<CommentType>) => {
        let comments = responseData?.data as CommentType[];

        comments = comments.map((comment) => ({
          ...comment,
          _id: comment.commentId,
        }));

        return comments;
      },
    }),

    updateComment: build.mutation({
      query: (commentData: CommentData) => ({
        url: "comment",
        method: "PUT",
        body: commentData,
      }),
      invalidatesTags: [{ type: "Comment", id: "LIST" }],
    }),

    deleteComment: build.mutation({
      query: (commentId: string) => ({
        url: `comment/${commentId}`,
        method: "DELETE",
      }),
      invalidatesTags: [
        { type: "Comments", id: "LIST" },
        { type: "Subtasks", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useCreateCommentMutation,
  useGetCommentsQuery,
  useGetCommentByIdQuery,
  useGetCommentBySubtaskIdQuery,
  useUpdateCommentMutation,
  useDeleteCommentMutation,
} = commentApiSlice;
