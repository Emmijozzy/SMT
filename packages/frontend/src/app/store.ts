import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api/apislice";
import authReducer from "../features/auth/authSlice";
import alertReducer from "../features/alerts/AlertSlice";

// Define RootState interface
export interface RootState {
  auth: ReturnType<typeof authReducer>; // Type for auth state
  alert: ReturnType<typeof alertReducer>;
}
export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    alert: alertReducer,
  },
  middleware: (GetDefaultMiddleware) => GetDefaultMiddleware().concat(apiSlice.middleware),
});
