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
  description: string;
  isSubmitting: boolean;
  error: string | null;
}