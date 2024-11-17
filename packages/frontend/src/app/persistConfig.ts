import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["users", "tasks", "team", "userProfile"],
  blacklist: ["userProfile"],
};

export default persistConfig;
