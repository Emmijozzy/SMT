/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { BaseQueryApi, FetchArgs, createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "../store";
import { setCredentials } from "../../features/auth/authSlice";
import log from "../../shared/utils/log";

interface SuccessData {
  accessToken: string;
}

interface ErrorData {
  error: {
    data: {
      message: string;
    };
    status: number;
  };
}

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:3003",
  prepareHeaders: (headers, { getState }) => {
    const { token } = (getState() as RootState).auth;

    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }

    return headers;
  },
  credentials: "include",
});

const baseQueryWithReactAuth = async (args: string | FetchArgs, api: BaseQueryApi, extraOptions: object) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 403) {
    log("error", "requesting new access token with refresh token");

    const refreshResult = await baseQuery("/auth/refresh", api, extraOptions);

    if (refreshResult.data) {
      const { accessToken } = refreshResult.data as SuccessData;
      api.dispatch(setCredentials(accessToken));

      result = await baseQuery(args, api, extraOptions);
    } else {
      const refreshError = { ...refreshResult } as ErrorData;
      if (refreshError?.error?.status === 403) {
        refreshError.error.data.message = "Your login has expired";
        return refreshError;
      }
      return refreshResult;
    }
  }

  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReactAuth,
  tagTypes: ["User"],
  endpoints: (_builder) => ({}),
});
