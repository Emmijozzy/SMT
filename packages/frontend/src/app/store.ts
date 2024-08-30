/* eslint-disable import/no-named-as-default */
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-cycle */
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import { apiSlice } from "./api/apislice";
import authReducer from "../features/auth/authSlice";
import alertReducer from "../features/alerts/AlertSlice";
import userProfileReducer from "../features/users/userProfileSlice";
import statusReducer from "../shared/Slice/statusSlice";
import layoutReducer from "../layout/layoutSlice";
import localStorageMiddleware from "./api/middleware";
import loaderReducer from "../features/loading/loaderSlice";
import userTableReducer from "../features/users/userTableSlice";
import usersReducer from "../features/users/userSlice";
import deleteUserReducer from "../features/users/DeleteUser/DeleteUserSlice";
import tasksTableReducer from "../features/tasks/TasksTable/tasksTableSlice";
import tasksReducer from "../features/tasks/tasksSlice";
import persistConfig from "./persistConfig";

const rootReducer = combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer,
  auth: authReducer,
  alert: alertReducer,
  userProfile: userProfileReducer,
  status: statusReducer,
  layout: layoutReducer,
  loader: loaderReducer,
  userTable: userTableReducer,
  users: usersReducer,
  deleteUser: deleteUserReducer,
  taskTable: tasksTableReducer,
  tasks: tasksReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer);

// // Define RootState interface
export interface RootState {
  auth: ReturnType<typeof authReducer>; // Type for auth state
  alert: ReturnType<typeof alertReducer>;
  userProfile: ReturnType<typeof userProfileReducer>;
  status: ReturnType<typeof statusReducer>;
  layout: ReturnType<typeof layoutReducer>;
  loader: ReturnType<typeof loaderReducer>;
  userTable: ReturnType<typeof userTableReducer>;
  users: ReturnType<typeof usersReducer>;
  deleteUser: ReturnType<typeof deleteUserReducer>;
  taskTable: ReturnType<typeof tasksTableReducer>;
  tasks: ReturnType<typeof tasksReducer>;
}

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (GetDefaultMiddleware) =>
    GetDefaultMiddleware({
      serializableCheck: false
    }).concat(apiSlice.middleware).concat(localStorageMiddleware),
});

export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);


