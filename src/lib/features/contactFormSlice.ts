import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { FormFields } from '@/types';

const initialFormState: FormFields = {
  firstName: { hasValue: false, value: '', isValid: false, errorMessage: ''},
  lastName: { hasValue: false, value: '', isValid: false, errorMessage: ''},
  email: { hasValue: false, value: '', isValid: false, errorMessage: ''},
  phone: { hasValue: false, value: '', isValid: false, errorMessage: ''},
  subject: { hasValue: true, value: '', isValid: true, errorMessage: ''},
  description: { hasValue: false, value: '', isValid: false, errorMessage: '', counter: 0 },
};

const contactFormSlice = createSlice({
  name: 'contactForm',
  initialState: initialFormState,
  reducers: {
    setHasValue: ( // Updates field state's hasValue property
      state,
      action: PayloadAction<{ field: keyof FormFields; value: boolean }>
    ) => { 
      state[action.payload.field].hasValue = action.payload.value;
    },
    setFieldValue: ( // Updates field state's value 
      state,
      action: PayloadAction<{ field: keyof FormFields; value: string }> // Accepts FormFields key : input value
    ) => { 
      state[action.payload.field].value = action.payload.value; // Updates the field's state
    },
    setIsValid: (
      state,
      action: PayloadAction<{ field: keyof FormFields; value: boolean }>
    ) => {
      state[action.payload.field].isValid = action.payload.value;
    },
    setFieldCounter: (
      state,
      action: PayloadAction<{ field: keyof FormFields; value: number }>
    ) => {
      state[action.payload.field].counter = action.payload.value;
    },
    setErrorMessage: (
      state,
      action: PayloadAction<{ field: keyof FormFields; value: string }>
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