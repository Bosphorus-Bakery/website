import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { ContactFields, FormFields, Item } from '@/types';
import { itemDetails } from '@/lib/constants';

// Intial state of contact info fields and item quantity
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
  order: {
    cart: itemDetails,
  },
};

const contactFormSlice = createSlice({
  name: 'contactForm',
  initialState: initialFormState,
  reducers: {
    setHasValue: (
      // Current state
      state,

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
    // Reducer updates item's state quantity
    incrementQuantity: (
      state,
      // Pass in item's id string in payload
      action: PayloadAction<string>,
    ) => {
      // Finds item in list of items that matches the id in payload 
      const item = state.order.cart.find((item) => item.id === action.payload);
      if (item) {
        item.quantity++;
      } else {
        console.log('ID of item not found');
      }
    },
    decrementQuantity: (state, action: PayloadAction<string>) => {
      const item = state.order.cart.find((item) => item.id === action.payload);
      if (item) {
        item.quantity--;
      } else {
        console.log('ID of item not found');
      }
    },        
    // Pass in item's id in payload
    setQuantity: (state, action: PayloadAction<{ item: string, quantityUpdate: string }>) => {
      const { itemId, quantityType } = action.payload;

      const item = state.order.cart.find((item) => item.id === action.payload);

      // If item is found then update state 
      if (item) {
        switch (action.type) {
          case 'INCREMENT':
            // return { ...state, quantity: item.quantity + 1 };
            break;
          case 'DECREMENT':
          // return { ...state, quantity: Math.max(0, state.quantity - 1) };
          case 'SET_TO_ONE':
          // return { ...state, quantity: 1 };
          case 'SET_TO_ZERO':
          // return { ...state, quantity: 0 };
          default:
            return state;
        }
      } else {
        console.log('ID of item not found');
      }
    },
  },
});

export const {
  setHasValue,
  setFieldValue,
  setIsValid,
  setFieldCounter,
  setErrorMessage,
  incrementQuantity,
  decrementQuantity,
} = contactFormSlice.actions;

export const contactFormReducer = contactFormSlice.reducer;
