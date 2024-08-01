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
}

const contactFormSlice = createSlice({
  name: 'contactForm',
  initialState,
  reducers: {

    // Accept initial state + action and returns new state obj
    setFirstName: (state, action: PayloadAction<string>) => {
      state.firstName = action.payload 
    },
    // Action's Payload explicitly typed so we expect a string
    setLastName: (state, action: PayloadAction<string>) => {
      state.lastName = action.payload 
    },
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload 
    },
    setPhone: (state, action: PayloadAction<string>) => {
      state.phone = action.payload 
    },
    setSubject: (state, action: PayloadAction<string>) => {
      state.subject = action.payload 
    },
    setDescription: (state, action: PayloadAction< name: string>) => {
      state.description = action.payload 
    },
    submitForm: (state, action: PayloadAction<boolean>) => {
      state.isSubmitting = true;
      state.submitForm = action.payload 
    },
    submitFormSuccess: (state)
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload 
    },
    clearError:
  }
})

export const { setFirstName, setLastName, setEmail, setSubject, setDescription } = contactFormSlice.actions;
export const contactFormReducer = contactFormSlice.reducer;
