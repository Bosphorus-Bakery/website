import { LargeNumberLike } from "crypto";

export interface AppState {
  isDark: boolean;
  theme: boolean;
}
// Type limits to only interface keys: firstName, lastName, etc
export type FormFieldNames = keyof ContactInfoFields; 

export interface ContactInfoFields {
  firstName: ContactInfoField;
  lastName: ContactInfoField;
  email: ContactInfoField;
  phone: ContactInfoField;
  subject: ContactInfoField;
  description: ContactInfoField;
}

export interface ContactInfoField {
  hasValue: boolean;
  value: string;
  isValid: boolean;
  errorMessage: string;
  counter?: number; // Optional character counter for fields with max length
}



export interface OrderFields {
  selectedDate: Date;
}