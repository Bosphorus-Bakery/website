import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { ContactFormState } from '@/types';
import { stringify } from 'querystring';

const initialState: ContactFormState = {
  firstName: '',
  lastName: '',
  email: '',
  phoneNumber: '',
  subject: '',
  description: '',
}

const contactFormSlice = createSlice({
  name: 'contactForm',
  initialState,
  reducers: {
    // Accept initial state + action and returns new state obj
    setFirstName: (state, action) => {

      // Immer "updates" the state under hood
      state.firstName = action.payload 
    },
    setLastName: (state, action) => {
      state.lastName = action.payload 
    },
    setEmail: (state, action) => {
      state.email = action.payload 
    },
    setSubject: (state, action) => {
      state.phoneNumber = action.payload 
    },
    setDescription: (state, action) => {
      state.description = action.payload 
    }
  }
})

export const { setFirstName, setLastName, setEmail, setSubject, setDescription } = contactFormSlice.actions;
export const contactForm = contactFormSlice.reducer;
