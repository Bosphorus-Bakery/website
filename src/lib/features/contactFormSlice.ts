import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { ContactFormState } from '@/types';

const initialContactFormState: ContactFormState = {
  firstName: { value: '', error: false },
  lastName: { value: '', error: false },
  email: { value: '', error: false },
  phone: { value: '', error: false },
  subject: { value: '', error: false, counter: 0 },
  description: { value: '', error: false, counter: 0 },
};
// TO DO: Refactor actions creators to make more dynamic: setFieldValue, setFieldError, setRequiredError, setCounter
const contactFormSlice = createSlice({
  name: 'contactForm',
  initialState: initialContactFormState,
  reducers: { // Action creators that update field's state value
    setFirstNameValue: (state, action: PayloadAction<string>) => {
      state.firstName.value = action.payload; 
    },
    setLastNameValue: (state, action: PayloadAction<string>) => {
      state.lastName.value = action.payload; 
    },
    setEmailValue: (state, action: PayloadAction<string>) => {
      state.email.value = action.payload; 
    },
    setPhoneValue: (state, action: PayloadAction<string>) => {
      state.phone.value = action.payload; 
    },
    setSubjectValue: (state, action: PayloadAction<string>) => {
      state.subject.value = action.payload; 
    },
    setDescriptionValue: (state, action: PayloadAction<string>) => {
      state.description.value = action.payload; 
    }, // Action creators that update field's error state boolean
    setFirstNameError: (state, action: PayloadAction<boolean>) => {
      state.firstName.error = action.payload;
    },
    setLastNameError: (state, action: PayloadAction<boolean>) => {
      state.lastName.error = action.payload;
    },
    setEmailError: (state, action: PayloadAction<boolean>) => {
      state.email.error = action.payload;
    },
    setPhoneError: (state, action: PayloadAction<boolean>) => {
      state.phone.error = action.payload;
    },
    setSubjectError: (state, action: PayloadAction<boolean>) => {
      state.subject.error = action.payload
    },
    setDescriptionError: (state, action: PayloadAction<boolean>) => {
      state.description.error = action.payload;
    }, 
    // Action creators that update subject and description
    setSubjectCounter: (state, action: PayloadAction<number>) => {
      state.subject.counter = action.payload; 
    },
    setDescriptionCounter: (state, action: PayloadAction<number>) => {
      state.description.counter = action.payload; 
    }
  },
});

export const { 
  setFirstNameValue, 
  setFirstNameError, 
  setLastNameValue, 
  setLastNameError, 
  setEmailValue, 
  setEmailError, 
  setPhoneValue, 
  setPhoneError, 
  setSubjectValue, 
  setSubjectError, 
  setSubjectCounter, 
  setDescriptionValue, 
  setDescriptionError, 
  setDescriptionCounter, 
} = contactFormSlice.actions;

export const contactFormReducer = contactFormSlice.reducer;