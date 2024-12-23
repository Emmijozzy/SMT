import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["users", "tasks", "team"],
  blacklist: ["userProfile"],
};

export default persistConfig;
