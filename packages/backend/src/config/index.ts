export const port: number = process.env.PORT ? parseInt(process.env.PORT) : 3000;

export const environment = process.env.NODE_ENV;
//Database
export const db = {
  dburl: process.env.DB_URL || "",
  minPoolSize: parseInt(process.env.DB_MIN_POOL_SIZE || "5"),
  maxPoolSize: parseInt(process.env.DB_MAX_POOL_SIZE || "10")
};

//log
export const logdirectory = process.env.LOG_DIR || "";
