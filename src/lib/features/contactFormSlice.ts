import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { ContactFormState } from '@/types';

const initialState: ContactFormState = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  subject: '',
  description: '',
  firstNameError: false,
  lastNameError: false,
  emailError: false,
  phoneError: false,
  subjectError: false,
  requiredError: true,
  descriptionError: false,
  subjectCounter: 0,
  descriptionCounter: 0,
};

const contactFormSlice = createSlice({
  name: 'contactForm',
  initialState,
  reducers: { // Action creators that update field's state value
    setFirstName: (state, action: PayloadAction<string>) => {
      state.firstName = action.payload; 
    },
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
    }, // Action creators that update field's error state boolean
    setFirstNameError: (state, action: PayloadAction<boolean>) => {
      state.firstNameError = action.payload;
    },
    setLastNameError: (state, action: PayloadAction<boolean>) => {
      state.lastNameError = action.payload;
    },
    setEmailError: (state, action: PayloadAction<boolean>) => {
      state.emailError = action.payload;
    },
    setPhoneError: (state, action: PayloadAction<boolean>) => {
      state.phoneError = action.payload;
    },
    setSubjectError: (state, action: PayloadAction<boolean>) => {
      state.subjectError = action.payload
    },
    setDescriptionError: (state, action: PayloadAction<boolean>) => {
      state.descriptionError = action.payload;
    }, 
    setRequiredError: (state, action: PayloadAction<boolean>) => {
      state.requiredError = action.payload;
    }, // Action creators that update subject and description
    setSubjectCounter: (state, action: PayloadAction<number>) => {
      state.subjectCounter = action.payload; 
    },
    setDescriptionCounter: (state, action: PayloadAction<number>) => {
      state.descriptionCounter = action.payload; 
    }
  },
});

export const { setFirstName, setFirstNameError, setLastName, setLastNameError, setEmail, setEmailError, setPhone, setPhoneError, setSubject, setSubjectError, setSubjectCounter, setDescription, setDescriptionError, setDescriptionCounter, setRequiredError } = contactFormSlice.actions;
export const contactFormReducer = contactFormSlice.reducer;