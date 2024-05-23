/* eslint-disable @typescript-eslint/no-explicit-any */
import { Response } from "express";

interface ApiResponse<T> {
  statusCode?: number;
  message: string;
  data?: T;
}

const successResponse = <T>(res: Response, data: ApiResponse<T>) => {
  if (!data.statusCode) {
    data.statusCode = 200;
  }
  res.status(data.statusCode).json({
    ...data,
    isSuccess: true
  });
};

export default successResponse;
