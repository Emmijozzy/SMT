/* eslint-disable no-console */
const log = (level: "info" | "warn" | "error" = "info", message = "", ...data: string[]) => {
  console.log(process.env.NODE_ENV);
  if (process.env.NODE_ENV === "Development" || process.env.NODE_ENV === "development") {
    console.log(`[${level.toUpperCase()}] ${message}`, ...data); // Example using //console.log
  } else {
    // TODO - Write a logic to send log to server
  }
};

export default log;
