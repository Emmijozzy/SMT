/* eslint-disable indent */
export const getIconColor = (action: string) => {
  switch (action.toLowerCase()) {
    case "subtask created":
      return { bg: "#4CAF50", shadow: "#45a049" };
    case "subtask started":
      return { bg: "#2196F3", shadow: "#1976D2" };
    case "submitted for review":
      return { bg: "#9C27B0", shadow: "#7B1FA2" };
    case "review rejected":
      return { bg: "#F44336", shadow: "#D32F2F" };
    case "resubmitted for review":
      return { bg: "#00BCD4", shadow: "#0097A7" };
    case "review approved":
      return { bg: "#8BC34A", shadow: "#7CB342" };
    default:
      return { bg: "#607D8B", shadow: "#455A64" };
  }
};
