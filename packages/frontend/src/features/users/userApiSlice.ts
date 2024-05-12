/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apislice";
import { IUser } from "./userInterface";
import { saveProfile } from "./userProfileSlice";
import log from "../../shared/utils/log";

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
      }),
      providesTags: (_result, _error, id) => [{ type: "User", id }],
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          const userProfile = data.data as Partial<IUser>;
          dispatch(saveProfile(userProfile));
        } catch (e: unknown) {
          const error = e as Error;
          log("error", "Error getting user profile", error.message, error.stack as string);
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
  }),
});

export const { useGetUserProfileQuery } = userApiSlice;
