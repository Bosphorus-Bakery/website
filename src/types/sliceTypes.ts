import { LargeNumberLike } from "crypto";

export interface AppState {
  isDark: boolean;
  theme: boolean;
}
// Type limits to only interface keys: firstName, lastName, etc
export type FormFieldName = keyof ContactFormState; 

export interface ContactFormState {
  firstName: FieldState;
  lastName: FieldState;
  email: FieldState;
  phone: FieldState;
  subject: FieldState;
  description: FieldState;
}

export interface FieldState {
  hasValue: boolean;
  value: string;
  isValid: boolean;
  showError: boolean;
  errorMessage: string;
  counter?: number; // Optional character counter for fields with max length
}


// export interface FieldLength {
//   fieldName: ContactFormField; // Field name in the Redux state
//   regex: RegExp; // Validation pattern
//   maxLength: number; // Maximum length for the input field
//   label: string; // Label for the input field
// }