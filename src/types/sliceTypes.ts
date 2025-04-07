export interface AppState {
  isDark: boolean;
  theme: boolean;
}

// Interface combining contact info fields and items state
export interface FormFields {
  contactInfo: ContactFields;
  order: OrderFields;
}

export interface ContactFields {
  firstName: ContactField;
  lastName: ContactField;
  email: ContactField;
  phone: ContactField;
  subject: ContactField;
  description: ContactField;
}
export interface ContactField {
  hasValue: boolean;
  value: string;
  isValid: boolean;
  errorMessage: string;
  counter?: number; // Optional field
}
// Type limits to only interface keys: firstName, lastName, etc
// export type ContactFieldNames = keyof ContactFields;

export interface OrderFields {
  cart: Item[];
  subtotal: number;
}

// Properties of every Item
export type Item = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  imageSrc: string;
};
