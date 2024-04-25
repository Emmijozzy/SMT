/* eslint-disable @typescript-eslint/no-explicit-any */
export default class ErrorResponse {
  constructor(
    public status: number, // HTTP status code (e.g., 401, 404, 500)
    public message: string, // User-friendly error message
    public code?: string, // Optional internal error code for debugging
    public details?: any // Optional additional details for specific errors (e.g., validation errors)
  ) {}
}
