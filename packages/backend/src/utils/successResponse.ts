/* eslint-disable @typescript-eslint/no-explicit-any */
import { Response } from "express";

export default class SuccessResponse {
  constructor(
    public readonly data: any,
    public readonly status: number = 200
  ) {}

  public send(res: Response): void {
    try {
      res.status(this.status).json(this.data); // Set status and send response data
    } catch (error) {
      console.error("Error sending success response:", error);
      // Handle errors appropriately (e.g., log to a file or monitoring service)
      res.status(500).json({ message: "Internal server error" }); // Send generic error response
    }
  }
}
