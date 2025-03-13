import { LargeNumberLike } from 'crypto';

export interface AppState {
  isDark: boolean;
  theme: boolean;
}

// Interface combining contact info fields and items state
export interface FormFields {
  contactInfo: ContactFields; 
  items: ItemsState;
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

  // Optional character counter for fields with max length
  counter?: number;
}
// Type limits to only interface keys: firstName, lastName, etc
// export type ContactFieldNames = keyof ContactFields;

// State of all Items
export interface ItemsState {
  items: Item[];
}

// Properties of every Item
export type Item = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  imageSrc: string;
};
