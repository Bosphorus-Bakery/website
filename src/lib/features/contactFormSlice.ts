import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { ContactFormState } from '@/types';

const initialContactFormState: ContactFormState = {
  firstName: { value: '', error: false, hasValue: false },
  lastName: { value: '', error: false },
  email: { value: '', error: false },
  phone: { value: '', error: false },
  subject: { value: '', error: false, counter: 0 },
  description: { value: '', error: false, counter: 0 },
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
      state[action.payload.field].error = action.payload.value;
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
    // setFieldRequired: (
    //   state,
    //   action: PayloadAction<{ field: keyof ContactFormState; value: boolean }>
    // ) => {
    //   state[action.payload.field].required = action.payload.value;
    // }
  },
});

export const { 
  setFieldValue, 
  setFieldError, 
  setFieldErrorMessage, 
  setFieldCounter, 
  setHasValue
  // setFieldRequired 
} = contactFormSlice.actions;

export const contactFormReducer = contactFormSlice.reducer;