export interface SinginData {
  userId: string;
  password: string;
}

export interface SignupData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface FormikProps {
  isSubmitting: boolean;
  errors: { [key: string]: string }; // Define errors object structure
}

export interface IField {
  name: string;
  tagField: string;
  errors: { [key: string]: string };
  fieldType?: string;
}
