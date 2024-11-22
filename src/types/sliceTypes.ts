import { LargeNumberLike } from "crypto";

export interface AppState {
  isDark: boolean;
  theme: boolean;
}
// Type limits to only interface keys: firstName, lastName, etc
export type FormFieldName = keyof ContactFormFields; 

export interface SubjectFieldState {
  value: string
}

export interface ContactFormFields {
  firstName: FieldState;
  lastName: FieldState;
  email: FieldState;
  phone: FieldState;
  subject: SubjectFieldState;
  description: FieldState;
}

export interface FieldState {
  hasValue: boolean;
  value: string;
  isValid: boolean;
  errorMessage: string;
  counter?: number; // Optional character counter for fields with max length
}