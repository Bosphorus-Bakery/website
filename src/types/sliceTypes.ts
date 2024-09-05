export interface AppState {
  isDark: boolean;
  theme: boolean;
}

// Defines the contact form's state structure
export interface ContactFormState {
  firstName: string;
  firstNameError: boolean;
  lastName: string;
  lastNameError: boolean;
  email: string;
  phone: string;
  subject: string;
  description: string;
  isSubmitting: boolean;
  error: string | null;
}