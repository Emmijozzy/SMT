/* eslint-disable import/no-cycle */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apislice";
import { IUser, ReqError } from "./userInterface";
import { saveProfile } from "./userProfileSlice";
import log from "../../shared/utils/log";
import { changeStatus } from "../../shared/Slice/statusSlice";
import { addAlert } from "../alerts/AlertSlice";

interface ResData {
  data: IUser[];
}

export const usersAdapter = createEntityAdapter({
  selectId: (user: IUser) => user.userId,
});

export const initialState = usersAdapter.getInitialState({});

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

        return usersAdapter.setAll(initialState, users);
        // return users;
      },
      providesTags: (result) =>
        result?.ids
          ? [{ type: "User" as const, id: "LIST" as const }, ...result.ids.map((id) => ({ type: "User" as const, id }))]
          : [{ type: "User" as const, id: "LIST" as const }],
    }),

    updateUserProfile: build.mutation({
      query: (credentials) => ({
        url: "/user/update_profile",
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

export const { useGetUsersQuery, useGetUserProfileQuery, useUpdateUserProfileMutation, useChangePasswordMutation } =
  userApiSlice;
