import { LargeNumberLike } from "crypto";

export interface AppState {
  isDark: boolean;
  theme: boolean;
}

// Types the fields in the Contact us form
export interface ContactFormState {
  firstName: string;
  firstNameError: boolean;
  lastName: string;
  lastNameError: boolean;
  email: string;
  emailError: boolean;
  phone: string;
  phoneError: boolean;
  subject: string;
  subjectError: boolean;
  subjectCounter: number;
  description: string;
  descriptionError: boolean;
  descriptionCounter: number;
  requiredError: boolean;
}