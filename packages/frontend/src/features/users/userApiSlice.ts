/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apislice";
import { IUser, ReqError } from "./userInterface";
import { saveProfile } from "./userProfileSlice";
import log from "../../shared/utils/log";
import { changeStatus } from "../../shared/Slice/statusSlice";
import { addAlert } from "../alerts/AlertSlice";

const usersAdapter = createEntityAdapter({
  selectId: (user: IUser) => user.userId,
});

const initialState = usersAdapter.getInitialState({});

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
      query: () => ({
        url: "/users",
        validateStatus: (response, result) => response.status === 200 || !result.isError,
      }),
      transformResponse: (responseData: IUser[]) => {
        const loadedUsers: IUser[] = responseData.map((user: IUser) => ({
          ...user,
          id: user.userId,
        }));
        return usersAdapter.setAll(initialState, loadedUsers);
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
    }),
  }),
});

export const { useGetUserProfileQuery, useUpdateUserProfileMutation } = userApiSlice;
