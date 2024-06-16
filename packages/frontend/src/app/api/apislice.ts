/* eslint-disable import/no-cycle */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { BaseQueryApi, FetchArgs, createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "../store";
import { setCredentials } from "../../features/auth/authSlice";
import log from "../../shared/utils/log";
import { changeStatus } from "../../shared/Slice/statusSlice";
import { addAlert } from "../../features/alerts/AlertSlice";

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
  timeout: 10000,
});

const baseQueryWithReactAuth = async (args: string | FetchArgs, api: BaseQueryApi, extraOptions: object) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status) {
    if (result?.error?.status === 403) {
      log("error", "requesting new access token with refresh token");

      const refreshResult = await baseQuery("/auth/refresh", api, extraOptions);

      if (refreshResult.data) {
        const { accessToken } = refreshResult.data as SuccessData;
        api.dispatch(setCredentials(accessToken));

        result = await baseQuery(args, api, extraOptions);
      } else if (refreshResult?.error?.status === "FETCH_ERROR") {
        api.dispatch(changeStatus("error"));
        api.dispatch(addAlert({ message: "Server Error", type: "error" }));
      } else if (refreshResult?.error?.status === "TIMEOUT_ERROR") {
        api.dispatch(changeStatus("error"));
        api.dispatch(addAlert({ message: "Timeout Error", type: "error" }));
      } else if (refreshResult?.error?.status === "PARSING_ERROR") {
        api.dispatch(changeStatus("error"));
        api.dispatch(addAlert({ message: "parsing Error", type: "error" }));
      } else {
        const refreshError = { ...refreshResult } as ErrorData;
        if (refreshError?.error?.status === 403) {
          api.dispatch(changeStatus("error"));
          api.dispatch(addAlert({ message: "Your login has expired", type: "error" }));
          refreshError.error.data.message = "Your login has expired";
          return refreshError;
        }
        return refreshResult;
      }
    } else if (result?.error.status === "FETCH_ERROR") {
      api.dispatch(changeStatus("error"));
      api.dispatch(addAlert({ message: "Server Error", type: "error" }));
    } else if (result?.error.status === "TIMEOUT_ERROR") {
      api.dispatch(changeStatus("error"));
      api.dispatch(addAlert({ message: "Timeout Error", type: "error" }));
    } else if (result?.error.status === "PARSING_ERROR") {
      api.dispatch(changeStatus("error"));
      api.dispatch(addAlert({ message: "parsing Error", type: "error" }));
    }
  }

  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReactAuth,
  tagTypes: ["User"],
  endpoints: (_builder) => ({}),
});
