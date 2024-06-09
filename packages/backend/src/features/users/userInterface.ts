import { Request } from "express";

export interface ExtendedRequest extends Request {
  user?: {
    userId: string;
    userRole: string;
  };
}

export interface IProfileToUpdate {
  email: string;
  phoneNo: string;
  location: string;
  whatsappLink: string;
  facebookLink: string;
  linkedInLink: string;
}
