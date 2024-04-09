import winston, { createLogger, transports, format } from "winston";
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
  // filename: `${dir}/${new Date().getDate()}.log`,
  filename: dir + "/%DATE%.log",
  datePattern: "YYYY-MM-DD",
  handleExceptions: true,
  maxSize: "20m",
  maxFiles: "14d",
  format: format.combine(format.errors({ stack: true }), format.timestamp(), format.json())
});

export default createLogger({
  transports: [
    new transports.Console({
      level: logLevel,
      format: format.combine(format.errors({ stack: true }), format.prettyPrint())
    }),
    dailyRotateFile
  ],
  exceptionHandlers: [dailyRotateFile],
  exitOnError: false
});

// export default createLogger({
//   level: "info", // Minimum log level
//   format: winston.format.json(), // JSON format output
//   transports: [
//     new winston.transports.Console(), // Console transport
//     dailyRotateFile
//   ]
// });
