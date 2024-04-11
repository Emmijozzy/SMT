import { Request, Response, NextFunction } from "express";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type IAsyncFunction = (req: Request, res: Response, next?: NextFunction) => Promise<any>;

const asyncHandler = (execution: IAsyncFunction) => (req: Request, res: Response, next: NextFunction) => {
  execution(req, res, next).catch(next);
};

export default asyncHandler;
