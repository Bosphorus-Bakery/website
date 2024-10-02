import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { ContactFormState } from '@/types';

const initialContactFormState: ContactFormState = {
  firstName: { value: '', error: false, required: true },
  lastName: { value: '', error: false, required: true },
  email: { value: '', error: false, required: true },
  phone: { value: '', error: false, required: false },
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
    setFieldRequired: (
      state,
      action: PayloadAction<{ field: keyof ContactFormState; value: boolean }>
    ) => {
      state[action.payload.field].required = action.payload.value;
    }
    // ,
    // setFirstNameValue: (state, action: PayloadAction<string>) => {
    //   state.firstName.value = action.payload; 
    // },
    // setLastNameValue: (state, action: PayloadAction<string>) => {
    //   state.lastName.value = action.payload; 
    // },
    // setEmailValue: (state, action: PayloadAction<string>) => {
    //   state.email.value = action.payload; 
    // },
    // setPhoneValue: (state, action: PayloadAction<string>) => {
    //   state.phone.value = action.payload; 
    // },
    // setSubjectValue: (state, action: PayloadAction<string>) => {
    //   state.subject.value = action.payload; 
    // },
    // setDescriptionValue: (state, action: PayloadAction<string>) => {
    //   state.description.value = action.payload; 
    // }, // Action creators that update field's error state boolean
    // setFirstNameError: (state, action: PayloadAction<boolean>) => {
    //   state.firstName.error = action.payload;
    // },
    // setLastNameError: (state, action: PayloadAction<boolean>) => {
    //   state.lastName.error = action.payload;
    // },
    // setEmailError: (state, action: PayloadAction<boolean>) => {
    //   state.email.error = action.payload;
    // },
    // setPhoneError: (state, action: PayloadAction<boolean>) => {
    //   state.phone.error = action.payload;
    // },
    // setSubjectError: (state, action: PayloadAction<boolean>) => {
    //   state.subject.error = action.payload
    // },
    // setDescriptionError: (state, action: PayloadAction<boolean>) => {
    //   state.description.error = action.payload;
    // }, 
    // // Action creators that update subject and description
    // setSubjectCounter: (state, action: PayloadAction<number>) => {
    //   state.subject.counter = action.payload; 
    // },
    // setDescriptionCounter: (state, action: PayloadAction<number>) => {
    //   state.description.counter = action.payload; 
    // }
  },
});

export const { 
  setFieldValue, 
  setFieldError, 
  setFieldErrorMessage, 
  setFieldCounter, 
  setFieldRequired 
} = contactFormSlice.actions;

export const contactFormReducer = contactFormSlice.reducer;