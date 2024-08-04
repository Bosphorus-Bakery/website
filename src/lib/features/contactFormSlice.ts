import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { ContactFormState } from '@/types';
// import { stringify } from 'querystring';

const initialState: ContactFormState = {
  firstName: '',
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
    // Action's Payload explicitly typed to expect a string
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
    submitForm: (
      state, 
      // Destructure form fields
      action: PayloadAction<{ 
        firstName: string, 
        lastName: string, 
        email: string, 
        phone: string, 
        subject: string, 
        description: string 
      }>
    ) => {

      // Each state property is updated from payload
      const { firstName, lastName, email, phone, subject, description } = action.payload
      state.firstName = firstName;
      state.lastName = lastName;
      state.email = email;
      state.phone = phone;
      state.subject = subject;
      state.description = description;
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

export const { setFirstName, setLastName, setEmail, setPhone, setSubject, setDescription, submitForm, submitFormSuccess, clearError } = contactFormSlice.actions;
export const contactFormReducer = contactFormSlice.reducer;
