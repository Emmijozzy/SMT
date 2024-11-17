/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { apiSlice } from "../../app/api/apislice";
import log from "../../shared/utils/log";
import { LoginData, RegisterData } from "./authInterface";
import { logOut, setCredentials } from "./authSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    register: build.mutation({
      query: (credential: RegisterData) => ({
        url: "/auth/register",
        method: "POST",
        body: { ...credential },
      }),
    }),
    login: build.mutation({
      query: (credential: LoginData) => ({
        url: "/auth/login",
        method: "POST",
        body: { ...credential },
      }),
    }),
    refresh: build.mutation({
      query: () => ({
        url: "/auth/refresh",
        method: "GET",
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const {
            data: { accessToken },
          } = await queryFulfilled;
          dispatch(setCredentials(accessToken));
        } catch (e: unknown) {
          const error = e as Error;
          log("error", "AuthApi refresh error", error.message, error.stack as string);
        }
      },
    }),
    logout: build.query({
      query: () => ({
        url: "/auth/logout",
        method: "GET",
      }),
      async onQueryStarted(_arg, { dispatch }) {
        try {
          dispatch(logOut());
        } catch (e: unknown) {
          const error = e as Error;
          log("error", "AuthApi logout error ", error.message, error.stack as string);
        }
      },
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation, useRefreshMutation, useLazyLogoutQuery } = authApiSlice;
