import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { ContactFormState } from '@/types';

const initialState: ContactFormState = {
  firstName: '',
  firstNameError: false,
  lastName: '',
  email: '',
  phone: '',
  subject: '',
  description: '',
  isSubmitting: false,
  error: null
};

const contactFormSlice = createSlice({
  name: 'contactForm',
  initialState,
  reducers: {

    // Accepts initial state plus action and returns new state object
    setFirstName: (state, action: PayloadAction<string>) => {
      state.firstName = action.payload; 
    },
    toggleFirstNameError: (state) => {
      state.firstNameError = !state.firstNameError
    },
    // Action's Payload expects a string
    setLastName: (state, action: PayloadAction<string>) => {
      state.lastName = action.payload; 
    },
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload; 
    },
    setPhone: (state, action: PayloadAction<string>) => {
      state.phone = action.payload; 
    },
    setSubject: (state, action: PayloadAction<string>) => {
      state.subject = action.payload; 
    },
    setDescription: (state, action: PayloadAction<string>) => {
      state.description = action.payload; 
    },
    submitForm: (state) => {
      state.isSubmitting = true;
    },
    submitFormSuccess: (state) => {
      state.isSubmitting = false; 
      state.error = null;

      // Clear form fields after successful form submission
      state.firstName = '';
      state.lastName = '';
      state.email = '';
      state.phone = '';
      state.subject = '';
      state.description = '';
    },
    submitFormFailure: (state, action: PayloadAction<string>) => {
      state.isSubmitting = false;
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const { setFirstName, toggleFirstNameError, setLastName, setEmail, setPhone, setSubject, setDescription, submitForm, submitFormSuccess, clearError } = contactFormSlice.actions;
export const contactFormReducer = contactFormSlice.reducer;