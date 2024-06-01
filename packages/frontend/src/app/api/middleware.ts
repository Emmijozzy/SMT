/* eslint-disable import/no-cycle */
import { Middleware } from "@reduxjs/toolkit";
import { RootState } from "../store";

const localStorageMiddleware: Middleware<{}, RootState> = (store) => (next) => (action) => {
  const result = next(action);
  const state = store.getState();

  // Type Guard for Action Type (Solution 1)
  if (typeof action === "object" && action && "type" in action) {
    const typedAction = action as { type: string }; // Narrow the type
    // Check for specific slice change based on action type prefix

    if (typedAction.type.startsWith("Layout/") || typedAction.type.startsWith("layout/")) {
      // Modify based on your slice's prefix
      const previousData = localStorage.getItem("layout");
      if (previousData !== JSON.stringify(state.layout)) {
        localStorage.setItem("layout", JSON.stringify(state.layout));
      }
    }
  }

  return result;
};

export default localStorageMiddleware;
