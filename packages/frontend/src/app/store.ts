/* eslint-disable import/no-named-as-default */
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-cycle */
import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api/apislice";
import authReducer from "../features/auth/authSlice";
import alertReducer from "../features/alerts/AlertSlice";
import userProfileReducer from "../features/users/userProfileSlice";
import statusReducer from "../shared/Slice/statusSlice";
import layoutReducer from "../layout/layoutSlice";
import localStorageMiddleware from "./api/middleware";

// Define RootState interface
export interface RootState {
  auth: ReturnType<typeof authReducer>; // Type for auth state
  alert: ReturnType<typeof alertReducer>;
  userProfile: ReturnType<typeof userProfileReducer>;
  status: ReturnType<typeof statusReducer>;
  layout: ReturnType<typeof layoutReducer>;
}
export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    alert: alertReducer,
    userProfile: userProfileReducer,
    status: statusReducer,
    layout: layoutReducer,
  },
  middleware: (GetDefaultMiddleware) =>
    GetDefaultMiddleware().concat(apiSlice.middleware).concat(localStorageMiddleware),
});
