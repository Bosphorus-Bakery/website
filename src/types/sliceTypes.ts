import { LargeNumberLike } from "crypto";

export interface AppState {
  isDark: boolean;
  theme: boolean;
}
// Type limits to only interface keys: firstName, lastName, etc
export type FormFieldNames = keyof FormFields; 

export interface FormFields {
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
  errorMessage: string;
  counter?: number; // Optional character counter for fields with max length
}