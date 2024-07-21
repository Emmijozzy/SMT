/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from "mongoose";

function filtersToMongooseQuery(filters: Record<string, string>): any {
  if (Object.keys(filters).length < 1) return {};

  const mongooseQuery: mongoose.FilterQuery<any> = {};
  for (const [key, value] of Object.entries(filters)) {
    try {
      // Basic conversion examples (adapt based on your filter syntax)
      if (key.endsWith("_gt")) {
        mongooseQuery[key.slice(0, -3)] = { $gt: parseFloat(value) } as mongoose.FilterQuery<any>;
      } else if (key.endsWith("_lt")) {
        mongooseQuery[key.slice(0, -3)] = { $lt: parseFloat(value) } as mongoose.FilterQuery<any>;
      } else if (key.endsWith("_like")) {
        mongooseQuery[key.slice(0, -5)] = new RegExp(value, "i"); // Case-insensitive search
      } else {
        mongooseQuery[key] = value; // Default assignment
      }
    } catch (error) {
      console.error(`Error parsing filter for key: ${key}`, error);
      // Consider handling invalid filter formats or ignoring them
    }
  }
  return mongooseQuery;
}

export default filtersToMongooseQuery;
