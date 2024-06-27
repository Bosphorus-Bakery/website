import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import type { AppState } from '@/types';
import { stringify } from 'querystring';

interface AppState {
  isDark: boolean;
  theme: boolean;
  form: {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    subject: string;
    description: string;
    
    // Index signature for variable form fields that depend on User input
    [key: string]: string;
  };
}

const initialState: AppState = {
  isDark: false,
  theme: true,
  form: {
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    subject: '',
    description: '',
  }
};


const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setIsDark: (state) => {
      state.isDark = !state.isDark;
    },
    /* Reducer setFieldValue accepts the state and action as arguments. The state is the form state and action will 
    manipulate the state. Our action has a type of PayloadAction (from Redux toolkit), capturing our action in payload. 
    Then we define the structure of this payload. Payload will have 2 properties: 1. field name and 2. the value assigned 
    to that form field. We then destructure the payload to work with field and value field easily. Lastly, we access the
    .form property of the state object at [field] key and set it to the value.
    */
    setFieldValue: (state, action: PayloadAction<{ field: string, value: string }>) => {
      const { field, value } = action.payload;
      state.form[field] = value;
    }
  },
});

export const { setIsDark } = appSlice.actions;

export const app = appSlice.reducer;
