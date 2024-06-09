/* eslint-disable @typescript-eslint/no-explicit-any */
import * as yup from "yup";
import { NextFunction, Request, Response, RequestHandler } from "express";
import { ValidationError } from "../utils/ApiError";

type ReplacementMap = { [key: string]: string }; // Map for placeholder replacements

const validationMiddleware = (schema: any, replacementMap?: ReplacementMap): RequestHandler => {
  //* TODO - Create the typescript type for schema
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const value = await schema.validate(req.body, { abortEarly: false });
      req.body = value; // Assign the validated body to the request
      next();
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        const errors = error.inner.map((detail) => {
          let message = detail.message;
          if (replacementMap) {
            // Apply replacements if a replacement map is provided
            for (const [placeholder, replacement] of Object.entries(replacementMap)) {
              message = message.replace(new RegExp(`\\[ref:${placeholder}\\]`, "g"), replacement);
            }
          }
          return `${detail.path}: ${message}` + "\n";
        });

        const validationErrors = new ValidationError(errors.join(" "));

        next(validationErrors); // Pass a custom error object
      } else {
        // Handle unexpected errors (optional)
        console.error("Unexpected error during validation:", error);
        next(error);
      }
    }
  };
};

export default validationMiddleware;
