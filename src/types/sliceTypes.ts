import { LargeNumberLike } from "crypto";

export interface AppState {
  isDark: boolean;
  theme: boolean;
}

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

// Type limits to only interface keys: firstName, lastName, etc
export type ContactFormField = keyof ContactFormState; 

export interface FieldLength {
  fieldName: ContactFormField; // Field name in the Redux state
  regex: RegExp; // Validation pattern
  maxLength: number; // Maximum length for the input field
  label: string; // Label for the input field
}