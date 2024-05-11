/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { apiSlice } from "../../app/api/apislice";
import { setCredentials } from "./authSlice";
import { LoginData, RegisterData } from "./authInterface";

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
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          const { accessToken } = data;
          dispatch(setCredentials(accessToken));
        } catch (e) {
          console.log(e);
        }
      },
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation, useRefreshMutation } = authApiSlice;
