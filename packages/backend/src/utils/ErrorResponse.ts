import { Response } from "express";

interface ApiErrorResponse {
  status?: number;
  message: string;
}

const errResponse = (res: Response, data: ApiErrorResponse) => {
  if (!data.status) {
    data.status = 500;
  }
  res.status(data.status).json({
    ...data,
    isError: true
  });
};

export default errResponse;
