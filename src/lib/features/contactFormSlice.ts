import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { ContactFormState } from '@/types';

const initialContactFormState: ContactFormState = {
  firstName: { value: '', validInput: false, hasValue: false },
  lastName: { value: '', validInput: false },
  email: { value: '', validInput: false },
  phone: { value: '', validInput: false },
  subject: { value: '', validInput: false, counter: 0 },
  description: { value: '', validInput: false, counter: 0 },
};

const contactFormSlice = createSlice({
  name: 'contactForm',
  initialState: initialContactFormState,
  reducers: {
    setFieldValue: ( // Generic action creator to update state's value of any field in ContactFormState
      state, // Accepts current state object
      action: PayloadAction<{ field: keyof ContactFormState; value: string }> // Accepts ContactFormState key : input value
    ) => { 
      state[action.payload.field].value = action.payload.value; // Updates the field's state
    },
    setHasValue: (
      state,
      action: PayloadAction<{ field: keyof ContactFormState; value: boolean }>
    ) => { 
      state[action.payload.field].hasValue = action.payload.value;
    },
    setFieldError: (
      state,
      action: PayloadAction<{ field: keyof ContactFormState; value: boolean }>
    ) => {
      state[action.payload.field].validInput = action.payload.value;
    },
    setFieldErrorMessage: (
      state,
      action: PayloadAction<{ field: keyof ContactFormState; value: string }>
    ) => {
      state[action.payload.field].errorMessage = action.payload.value;
    },
    setFieldCounter: (
      state,
      action: PayloadAction<{ field: keyof ContactFormState; value: number }>
    ) => {
      state[action.payload.field].counter = action.payload.value;
    },
  },
});

export const { 
  setFieldValue, 
  setFieldError, 
  setFieldErrorMessage, 
  setFieldCounter, 
  setHasValue
} = contactFormSlice.actions;

export const contactFormReducer = contactFormSlice.reducer;