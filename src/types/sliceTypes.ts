export interface AppState {
  isDark: boolean;
  theme: boolean;
}

// Interface combining contact info fields and items state
export interface FormFields {
  contactInfo: ContactFields;
}

export interface ContactFields {
  firstName: ContactField;
  lastName: ContactField;
  email: ContactField;
  phone: ContactField;
  message: ContactField;
}
export interface ContactField {
  hasValue: boolean;
  value: string;
  isValid: boolean;
  errorMessage: string;
}
