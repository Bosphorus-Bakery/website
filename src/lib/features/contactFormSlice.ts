import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { ContactFields, FormFields, Item } from '@/types';
import { cutDetails } from '@/lib/constants';

const initialFormState: FormFields = {
  contactInfo: {
    firstName: { hasValue: false, value: '', isValid: false, errorMessage: '' },
    lastName: { hasValue: false, value: '', isValid: false, errorMessage: '' },
    email: { hasValue: false, value: '', isValid: false, errorMessage: '' },
    phone: { hasValue: false, value: '', isValid: false, errorMessage: '' },
    subject: {
      hasValue: true,
      value: 'order', // To remove later
      isValid: true,
      errorMessage: '',
    },
    description: {
      hasValue: false,
      value: '',
      isValid: false,
      errorMessage: '',
      counter: 0,
    },
  },
  items: { // FormFields interface
    items: cutDetails, // ItemsState interface
  },
};

const contactFormSlice = createSlice({
  name: 'contactForm',
  initialState: initialFormState,
  reducers: {
    // Updates field state's hasValue property
    setHasValue: (
      state, // Current state

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
    setFieldCounter: (
      state,
      action: PayloadAction<{ field: keyof ContactFields; value: number }>,
    ) => {
      state.contactInfo[action.payload.field].counter = action.payload.value;
    },
    setErrorMessage: (
      state,
      action: PayloadAction<{ field: keyof ContactFields; value: string }>,
    ) => {
      state.contactInfo[action.payload.field].errorMessage =
        action.payload.value;
    },
  },
});

const itemSlice = createSlice({
  name: 'items'
})


export const {
  setHasValue,
  setFieldValue,
  setIsValid,
  setFieldCounter,
  setErrorMessage,
} = contactFormSlice.actions;

export const contactFormReducer = contactFormSlice.reducer;
