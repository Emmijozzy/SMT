/* eslint-disable no-console */
const log = (level: "info" | "warn" | "error" = "info", message = "", ...data: string[]) => {
  if (process.env.NODE_ENV === "Developemet") {
    // console.log(`[${level.toUpperCase()}] ${message}`, ...data); // Example using //console.log
  } else {
    // TODO - Write a logic to send log to server
  }
};

export default log;
