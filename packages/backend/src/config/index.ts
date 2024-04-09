export const port: number = process.env.PORT ? parseInt(process.env.PORT) : 3000;

export const environment = process.env.NODE_ENV;
//Database
export const mongoUrl: string = process.env.MONGO_URL || "";

//log
export const logdirectory = process.env.LOG_DIR || "";
