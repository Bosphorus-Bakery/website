import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { ContactFormState } from '@/types';

const initialState: ContactFormState = {
  firstName: '',
  firstNameError: false,
  lastName: '',
  lastNameError: false,
  email: '',
  emailError: false,
  phone: '',
  phoneError: false,
  subject: '',
  subjectError: false,
  subjectCounter: 0,
  description: '',
  descriptionError: false,
  descriptionCounter: 0,
  requiredError: true
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
    toggleLastNameError: (state) => {
      state.lastNameError = !state.lastNameError
    },
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload; 
    },
    toggleEmailError: (state) => {
      state.emailError = !state.emailError;
    },
    setPhone: (state, action: PayloadAction<string>) => {
      state.phone = action.payload; 
    },
    togglePhoneError: (state) => {
      state.phoneError = !state.phoneError;
    },
    setSubject: (state, action: PayloadAction<string>) => {
      state.subject = action.payload; 
    },
    toggleSubjectError: (state) => {
      state.subjectError = !state.subjectError;
    },
    setSubjectCounter: (state, action: PayloadAction<number>) => {
      state.subjectCounter = action.payload; 
    },
    setDescription: (state, action: PayloadAction<string>) => {
      state.description = action.payload; 
    },
    toggleDescriptionError: (state) => {
      state.descriptionError = !state.descriptionError;
    },
    setDescriptionCounter: (state, action: PayloadAction<number>) => {
      state.descriptionCounter = action.payload; 
    },
    toggleRequiredError: (state) => {
      state.requiredError = !state.requiredError;
    }
  },
});

export const { setFirstName, toggleFirstNameError, setLastName, toggleLastNameError, setEmail, toggleEmailError, setPhone, togglePhoneError, setSubject, toggleSubjectError, setSubjectCounter, setDescription, toggleDescriptionError, setDescriptionCounter, toggleRequiredError } = contactFormSlice.actions;
export const contactFormReducer = contactFormSlice.reducer;