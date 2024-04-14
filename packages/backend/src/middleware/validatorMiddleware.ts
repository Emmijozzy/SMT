// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { Request, Response, NextFunction } from "express";
// import * as yup from "yup";

// export type YupSchema = yup.Schema<any> | yup.ObjectSchema<any>;

// export interface ValidationErrorDetails {
//   field: string; // Property name representing the error path
//   message: string;
// }

// export class ValidationErrorException extends Error {
//   constructor(
//     public readonly errors: ValidationErrorDetails[],
//     public readonly status: number = 400
//   ) {
//     super("Validation failed");
//   }
// }

// const validationMiddleware = (schema: YupSchema) => {
//   return (req: Request, res: Response, next: NextFunction) => {
//     if (!schema) {
//       return res.status(500).json({ error: "Validation schema is missing or invalid" });
//     }
//     try {
//       // Use validateAsync for asynchronous validation (recommended)
//       schema.validateSync(req.body);
//       next();
//     } catch (error) {
//       if (error instanceof yup.ValidationError) {
//         // Check for Yup's ValidationError using instanceof
//         const errors = error.errors.map((detail) => ({
//           field: detail.split(".")[0], // Extract the first part of the path as the field
//           message: detail
//         }));
//         next(new ValidationErrorException(errors));
//       } else {
//         // Handle unexpected errors (optional)
//         console.error("Unexpected error during validation:", error);
//         next(error);
//       }
//     }
//   };
// };

// export default validationMiddleware;
