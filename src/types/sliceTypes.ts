import { LargeNumberLike } from 'crypto';

export interface AppState {
  isDark: boolean;
  theme: boolean;
}

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
  counter?: number; // Optional character counter for fields with max length
}
// Type limits to only interface keys: firstName, lastName, etc
// export type ContactFieldNames = keyof ContactFields;

export interface OrderFields {
  selectedDate: Date;
  cart: Array<CartItem>;
}
export type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
};

export interface CutType {
  id: string;
  name: string;
  price: number;
  imageSrc: string;
}
