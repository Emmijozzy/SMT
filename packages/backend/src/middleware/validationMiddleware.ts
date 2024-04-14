import * as Joi from "joi";
import { NextFunction, Request, Response, RequestHandler } from "express";
import { ValidationError } from "joi"; // Import ValidationError

export interface ValidationErrorDetails {
  message: string;
  path: (string | number)[]; // Array of property names representing the error path
}

export class ValidationErrorException extends Error {
  constructor(
    public readonly errors: ValidationErrorDetails[],
    public readonly status: number = 400
  ) {
    super("Validation failed");
  }
}

type ReplacementMap = { [key: string]: string }; // Map for placeholder replacements

const validationMiddleware = (schema: Joi.Schema, replacementMap?: ReplacementMap): RequestHandler => {
  const validationOptions = {
    abortEarly: false, // Continue validation even after the first error
    allowUnknown: true, // Allow extra properties in the request body
    stripUnknown: false // Remove extra properties from the request body
  };

  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      // console.log(req.body);
      const value = await schema.validateAsync(req.body, validationOptions);
      // console.log(await schema.validateAsync(req.body, validationOptions));
      req.body = value; // Assign the validated body to the request
      next();
    } catch (error) {
      if (error instanceof ValidationError) {
        const errors = error.details.map((detail) => {
          let message = detail.message;
          if (replacementMap) {
            // Apply replacements if a replacement map is provided
            for (const [placeholder, replacement] of Object.entries(replacementMap)) {
              message = message.replace(new RegExp(`\\[ref:${placeholder}\\]`, "g"), replacement);
            }
          }
          return {
            message,
            path: detail.path
          };
        });
        next(new ValidationErrorException(errors)); // Pass a custom error object
      } else {
        // Handle unexpected errors (optional)
        console.error("Unexpected error during validation:", error);
        next(error);
      }
    }
  };
};

export default validationMiddleware;

// const passwordReplacementMap = {
//   password: 'your password', // Customize the replacement message
// };
