/* eslint-disable indent */
/* eslint-disable import/no-cycle */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import { apiSlice } from "../../app/api/apislice";
import { changeStatus } from "../../shared/Slice/statusSlice";
import log from "../../shared/utils/log";
import { addAlert } from "../alerts/AlertSlice";
import { saveProfile } from "../profile/userProfileSlice";
import User, { IUser, ReqError } from "./userInterface";
import { setUsers } from "./userSlice";

interface ResData {
  data: IUser[];
}

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getUserProfile: build.query({
      query: () => ({
        url: "/user/profile",
        validateStatus: (response, result) => response.status === 200 || !result.isError,
        timeout: 1000,
      }),
      providesTags: (_result, _error, id) => [{ type: "User", id }],
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          dispatch(changeStatus("loading"));
          const { data } = await queryFulfilled;
          // console.log(data);
          const userProfile = data.data as Partial<IUser>;
          dispatch(saveProfile(userProfile));
          dispatch(changeStatus("success"));
        } catch (e) {
          const { error } = e as ReqError;
          dispatch(addAlert({ message: error.data.message, type: "error" }));
          log("error", "Error getting user profile", error.data.message, error.data.stack);
          dispatch(changeStatus("error"));
        }
      },
    }),

    getUsers: build.query({
      query: (query) => {
        const filteredQuery = query as Record<string, string>;
        if (typeof filteredQuery == "object") {
          const stringifyQuery = JSON.stringify(filteredQuery);
          // console.log(stringifyQuery);
          return {
            url: `/user/get_all?filters=${stringifyQuery}`,
            validateStatus: (response, result) => response.status === 200 || !result.isError,
          };
        }
        return {
          url: "/user/get_all",
          validateStatus: (response, result) => response.status === 200 || !result.isError,
        };
      },
      transformResponse: (responseData: ResData) => {
        let users = responseData?.data;

        users = users.map((user: IUser) => ({
          ...user,
          _id: user.userId,
        }));

        return users;
      },
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setUsers(data));
        } catch (e: unknown) {
          const error = e as Error;
          log("error", "UserApi getUser Error", error.message, error.stack as string);
        }
      },
      providesTags: (result) =>
        result
          ? [
              ...result.map((user) => ({
                type: "User" as const,
                id: user.userId || "UNKNOWN", // Fallback in case taskId is undefined
              })),
              { type: "Users", id: "LIST" },
            ]
          : [{ type: "Users", id: "LIST" }],
    }),

    createUser: build.mutation({
      query: (userData: User) => ({
        url: "/user_admin/create",
        method: "POST",
        body: { ...userData },
      }),
      invalidatesTags: [
        { type: "User" as const, id: "LIST" as const },
        { type: "Team" as const, id: "LIST" as const },
        { type: "Teams" as const, id: "LIST" as const },
      ],
    }),

    updateUserProfile: build.mutation({
      query: (credentials) => ({
        url: "/user/update_profile",
        method: "PATCH",
        body: { ...credentials },
      }),
      invalidatesTags: [{ type: "User" as const, id: "LIST" as const }],
    }),

    updateUser: build.mutation({
      query: (credentials) => ({
        url: "/user_admin/update",
        method: "PUT",
        body: { ...credentials },
      }),
      invalidatesTags: (_result, _error, arg) => [
        { type: "User", id: arg.userId },
        { type: "Teams" as const, id: "LIST" as const },
        { type: "Team" as const },
        { type: "Tasks" as const, id: "LIST" as const },
        { type: "Users" as const, id: "LIST" as const },
      ],
    }),

    deleteUser: build.mutation({
      query: (credentials) => ({
        url: "/user_admin/delete",
        method: "PATCH",
        body: { ...credentials },
      }),
      invalidatesTags: [{ type: "User" as const, id: "LIST" as const }],
    }),

    restoreUser: build.mutation({
      query: (credentials) => ({
        url: "/user_admin/restore",
        method: "PATCH",
        body: { ...credentials },
      }),
      invalidatesTags: [{ type: "User" as const, id: "LIST" as const }],
    }),

    changePassword: build.mutation({
      query: (credentials) => ({
        url: "/user/change_password",
        method: "PATCH",
        body: { ...credentials },
      }),
    }),
  }),
});

export const {
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useRestoreUserMutation,
  useGetUsersQuery,
  useGetUserProfileQuery,
  useUpdateUserProfileMutation,
  useChangePasswordMutation,
} = userApiSlice;
