/* eslint-disable no-console */
const log = (level: "info" | "warn" | "error" = "info", message = "", fileName = "", ...data: string[]) => {
  // console.log(process.env.NODE_ENV);
  if (process.env.NODE_ENV === "Development" || process.env.NODE_ENV === "development") {
    if (level === "error") {
      console.error(`[${level.toUpperCase()}] ${message}`, `Filename: ${fileName}`, ...data); // Example using //console.error
    } else if (level === "warn") {
      console.warn(`[${level.toUpperCase()}] ${message}`, `Filename: ${fileName}`, ...data); // Example using //console.warn
    } else if (level === "info") {
      console.info(`[${level.toUpperCase()}] ${message}`, `Filename: ${fileName}`, ...data); // Example using //console.info
    }
  } else {
    // TODO - Write a logic to send log to server
  }
};

export default log;
