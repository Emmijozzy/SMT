/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apislice";
import { IUser } from "./userInterface";

const usersAdapter = createEntityAdapter({
  selectId: (user: IUser) => user.userId,
});

const initialState = usersAdapter.getInitialState({});

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
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
