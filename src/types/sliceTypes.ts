import { LargeNumberLike } from "crypto";

export interface AppState {
  isDark: boolean;
  theme: boolean;
}

// Types the fields in the Contact us form
// export interface ContactFormState {
//   firstName: string;
//   firstNameError: object;
//   lastName: string;
//   lastNameError: boolean;
//   email: string;
//   emailError: boolean;
//   phone: string;
//   phoneError: boolean;
//   subject: string;
//   subjectError: boolean;
//   subjectCounter: number;
//   description: string;
//   descriptionError: boolean;
//   descriptionCounter: number;
//   requiredError: boolean;
// }

interface FieldState {
  value: string;
  error: boolean;
  errorMessage?: string; // Optional error message for more detailed errors
  counter?: number; // Optional character counter for fields with max length
  required?: boolean
}

export interface ContactFormState {
  firstName: FieldState;
  lastName: FieldState;
  email: FieldState;
  phone: FieldState;
  subject: FieldState;
  description: FieldState;
}