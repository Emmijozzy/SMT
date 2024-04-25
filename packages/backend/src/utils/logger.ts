import { createLogger, transports, format } from "winston";
import fs from "fs";
import path from "path";
import DailyRotateFile from "winston-daily-rotate-file";
import { environment, logdirectory } from "../config";

const fsPromises = fs.promises;

const dir = path.join(__dirname, "..", logdirectory);

// export const logIniit = () => {
//   if (!fs.existsSync(dir)) {
//     fsPromises.mkdir(dir);
//   }
// };

if (!fs.existsSync(dir)) {
  fsPromises.mkdir(dir);
}

const logLevel = environment === "development" ? "debug" : "info";

const dailyRotateFile = new DailyRotateFile({
  level: logLevel,
  filename: dir + "/%DATE%.log",
  datePattern: "YYYY-MM-DD",
  handleExceptions: true,
  maxSize: "20m",
  maxFiles: "14d",
  format: format.combine(
    format.colorize(), // Add color for better readability (optional)
    format.timestamp(),
    format.errors({ stack: true }), // Include stack trace for errors
    format.printf((info) => {
      if (info.level === "error") {
        // Log detailed information only for errors
        const { level, message, timestamp, stack } = info;
        return `${timestamp} [${level}] ${message}\n${stack}`;
      }
      return info.message;
      // Ensure the return value is always a string
    })
  )
});

export default createLogger({
  transports: [
    new transports.Console({
      level: logLevel,
      format: format.combine(format.errors({ stack: true }), format.prettyPrint())
    }),
    dailyRotateFile
  ],
  exceptionHandlers: [
    dailyRotateFile,
    new transports.Console({
      level: logLevel,
      format: format.combine(format.errors({ stack: true }), format.prettyPrint())
    })
  ],
  exitOnError: false
});
