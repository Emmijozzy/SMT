/* eslint-disable no-param-reassign */
/* eslint-disable import/no-named-as-default */
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-cycle */
import { combineReducers, configureStore, Middleware, PayloadAction, Reducer } from "@reduxjs/toolkit";
import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from "redux-persist";
import { PersistPartial } from "redux-persist/es/persistReducer";
import alertReducer from "../features/alerts/AlertSlice";
import authReducer from "../features/auth/authSlice";
import loaderReducer from "../features/loading/loaderSlice";
import userProfileReducer from "../features/profile/userProfileSlice";
import deleteTaskReducer from "../features/tasks/deleteTask/deleteTaskSlice";
import tasksReducer from "../features/tasks/tasksSlice";
import teamReducer from "../features/teams/teamSlice";
import teamTableReducer from "../features/teams/teamTable/teamTableSlice";
import deleteUserReducer from "../features/users/DeleteUser/DeleteUserSlice";
import usersReducer from "../features/users/userSlice";
import userTableReducer from "../features/users/userTableSlice";
import layoutReducer from "../layout/layoutSlice";
import statusReducer from "../shared/Slice/statusSlice";
import subtaskReducer from "../features/subtasks/subtaskSlice";
import { apiSlice } from "./api/apislice";
import localStorageMiddleware from "./api/middleware";
import persistConfig from "./persistConfig";
import notificationReducer from "../layout/components/headNavbar/Slice/NotificationSlice";

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
  tasks: ReturnType<typeof tasksReducer>;
  deleteTask: ReturnType<typeof deleteTaskReducer>;
  teams: ReturnType<typeof teamReducer>;
  teamTable: ReturnType<typeof teamTableReducer>;
  subtasks: ReturnType<typeof subtaskReducer>;
  notification: ReturnType<typeof notificationReducer>;
}

const rootReducer = (state: RootState | undefined, action: PayloadAction) => {
  if (action.type === "app/resetStore") {
    state = undefined;
  }

  return combineReducers({
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
    deleteTask: deleteTaskReducer,
    tasks: tasksReducer,
    teams: teamReducer,
    teamTable: teamTableReducer,
    subtasks: subtaskReducer,
    notification: notificationReducer,
  })(state, action);
};
const persistedReducer = persistReducer(persistConfig, rootReducer as Reducer<RootState, PayloadAction>);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: {
    name: "MyApp",
    trace: true,
    traceLimit: 25,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
      immutableCheck: false,
    })
      .concat(apiSlice.middleware as unknown as Middleware<object, RootState & PersistPartial>) // Add the API middleware
      .concat(localStorageMiddleware), // Add your custom middleware
});

export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);
