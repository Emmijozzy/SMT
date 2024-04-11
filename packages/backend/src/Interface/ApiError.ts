import { Response, Request } from "express";

interface IApiError {
  status: number;
  message: string;
  log?: (req: Request) => void;
  send?: (res: Response) => void;
}

export default IApiError;
