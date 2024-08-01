export interface AppState {
  isDark: boolean;
  theme: boolean;
}

export interface ContactFormState {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  subject: string;
  description: string;
  isSubmitting: boolean;
  error: string | null;
}