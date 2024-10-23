import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { ContactFormState } from '@/types';

const initialContactFormState: ContactFormState = {
  firstName: { hasValue: false, value: '', isValid: false },
  lastName: { hasValue: false, value: '', isValid: false },
  email: { hasValue: false, value: '', isValid: false },
  phone: { hasValue: false, value: '', isValid: false },
  subject: { hasValue: false, value: '', isValid: false, counter: 0 },
  description: { hasValue: false, value: '', isValid: false, counter: 0 },
};

const contactFormSlice = createSlice({
  name: 'contactForm',
  initialState: initialContactFormState,
  reducers: {
    setHasValue: ( // Updates field state's hasValue property
      state,
      action: PayloadAction<{ field: keyof ContactFormState; value: boolean }>
    ) => { 
      state[action.payload.field].hasValue = action.payload.value;
    },
    setFieldValue: ( // Updates field state's value 
      state,
      action: PayloadAction<{ field: keyof ContactFormState; value: string }> // Accepts ContactFormState key : input value
    ) => { 
      state[action.payload.field].value = action.payload.value; // Updates the field's state
    },
    setIsValid: (
      state,
      action: PayloadAction<{ field: keyof ContactFormState; value: boolean }>
    ) => {
      state[action.payload.field].isValid = action.payload.value;
    },
    setFieldCounter: (
      state,
      action: PayloadAction<{ field: keyof ContactFormState; value: number }>
    ) => {
      state[action.payload.field].counter = action.payload.value;
    },
    setErrorMessage: (
      state,
      action: PayloadAction<{ field: keyof ContactFormState; value: string }>
    ) => {
      state[action.payload.field].errorMessage = action.payload.value;
    },
  },
});

export const { 
  setHasValue,
  setFieldValue, 
  setIsValid,
  setFieldCounter, 
  setErrorMessage, 
} = contactFormSlice.actions;

export const contactFormReducer = contactFormSlice.reducer;