import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { ContactFields, FormFields, CartItem } from '@/types';

const today = new Date().toISOString().split('T')[0];

const initialFormState: FormFields = {
  contactInfo: { 
    firstName: { hasValue: false, value: '', isValid: false, errorMessage: ''},
    lastName: { hasValue: false, value: '', isValid: false, errorMessage: ''},
    email: { hasValue: false, value: '', isValid: false, errorMessage: ''},
    phone: { hasValue: false, value: '', isValid: false, errorMessage: ''},
    subject: { hasValue: true, value: '', isValid: true, errorMessage: ''},
    description: { hasValue: false, value: '', isValid: false, errorMessage: '', counter: 0 },
  },
  order: {
    selectedDate: new Date(),
    cart: []
  }
};

const contactFormSlice = createSlice({
  name: 'contactForm',
  initialState: initialFormState,
  reducers: {
    setHasValue: ( // Updates field state's hasValue property
      state, // Current state
      action: PayloadAction<{ field: keyof ContactFields; value: boolean }>) => { // Field to update and new value
        
        // Update contact info field's hasValue to value in payload
        state.contactInfo[action.payload.field].hasValue = action.payload.value;
    },
    setFieldValue: ( // Updates field state's value 
      state,
      action: PayloadAction<{ field: keyof ContactFields; value: string }> // Accepts ContactFieldNames key : input value
    ) => { 
      state.contactInfo[action.payload.field].value = action.payload.value; // Updates the field's state
    },
    setIsValid: (
      state,
      action: PayloadAction<{ field: keyof ContactFields; value: boolean }>
    ) => {
      state.contactInfo[action.payload.field].isValid = action.payload.value;
    },
    setFieldCounter: (
      state,
      action: PayloadAction<{ field: keyof ContactFields; value: number }>
    ) => {
      state.contactInfo[action.payload.field].counter = action.payload.value;
    },
    setErrorMessage: (
      state,
      action: PayloadAction<{ field: keyof ContactFields; value: string }>
    ) => {
      state.contactInfo[action.payload.field].errorMessage = action.payload.value;
    },
    setDate: (
      state,
      action: PayloadAction<{ value: Date }>
    ) => {
      state.order.selectedDate = action.payload.value;
    },
    addItemToCart: (
      state,
      action: PayloadAction<{ cart: Array<CartItem>; item: CartItem }>
    ) => {
    },
  },
});

export const { 
  setHasValue,
  setFieldValue, 
  setIsValid,
  setFieldCounter, 
  setErrorMessage,
  setDate
} = contactFormSlice.actions;

export const contactFormReducer = contactFormSlice.reducer;