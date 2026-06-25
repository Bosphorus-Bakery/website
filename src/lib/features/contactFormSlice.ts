import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { ContactFields, FormFields } from '@/types';

// Intial state of form fields
const initialFormState: FormFields = {
  contactInfo: {
    firstName: { hasValue: false, value: '', isValid: false, errorMessage: '' },
    lastName: { hasValue: false, value: '', isValid: false, errorMessage: '' },
    email: { hasValue: false, value: '', isValid: false, errorMessage: '' },
    phone: { hasValue: false, value: '', isValid: false, errorMessage: '' },
    message: {
      hasValue: false,
      value: '',
      isValid: false,
      errorMessage: '',
    },
  },
};

// Methods to update form state
const contactFormSlice = createSlice({
  name: 'contactForm',
  initialState: initialFormState,
  reducers: {
    setHasValue: (
      // Current state
      state,
      // Field to update and new value
      action: PayloadAction<{ field: keyof ContactFields; value: boolean }>,
    ) => {
      // Update contact info field's hasValue to value in payload
      state.contactInfo[action.payload.field].hasValue = action.payload.value;
    },
    setFieldValue: (
      // Updates field state's value
      state,
      action: PayloadAction<{ field: keyof ContactFields; value: string }>, // Accepts ContactFieldNames key : input value
    ) => {
      state.contactInfo[action.payload.field].value = action.payload.value; // Updates the field's state
    },
    setIsValid: (
      state,
      action: PayloadAction<{ field: keyof ContactFields; value: boolean }>,
    ) => {
      state.contactInfo[action.payload.field].isValid = action.payload.value;
    },
    setErrorMessage: (
      state,
      action: PayloadAction<{ field: keyof ContactFields; value: string }>,
    ) => {
      state.contactInfo[action.payload.field].errorMessage =
        action.payload.value;
    },
    resetContactForm: () => initialFormState,
  },
});

export const {
  setHasValue,
  setFieldValue,
  setIsValid,
  setErrorMessage,
  resetContactForm,
} = contactFormSlice.actions;

export const contactFormReducer = contactFormSlice.reducer;
