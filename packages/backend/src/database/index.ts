import mongoose from "mongoose";
import logger from "../utils/logger";
import { db } from "../config";

const options = {
  autoIndex: true,
  minPoolSize: db.minPoolSize,
  maxPoolSize: db.maxPoolSize,
  connectTimeoutMS: 60000,
  socketTimeoutMS: 45000
};

export const connectDB = async () => {
  try {
    await mongoose.connect(db.dburl, options).then(() => {
      logger.info("Mongoose connection done");
    });
  } catch (error) {
    if (error instanceof Error) {
      logger.error(error.message);
    } else {
      logger.error("An unknown error occurred");
    }
  }
};
