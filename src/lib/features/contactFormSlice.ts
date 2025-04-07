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
    subtotal: 0,
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
    // Pass in item's id and quantity update type to payload
    setQuantity: (
      state,
      action: PayloadAction<{ itemId: string; type: string }>,
    ) => {
      // Find item by payload itemId
      const item = state.order.cart.find(
        (item) => item.id === action.payload.itemId,
      );

      // If item is found then update state
      if (item) {
        switch (action.payload.type) {
          case 'INCREMENT':
            console.log('INCREMENT Case called');
            item.quantity++;
            break;
          case 'DECREMENT':
            console.log('DECREMENT Case called');
            item.quantity = Math.max(0, item.quantity - 1);
            break;
          case 'SET_TO_ONE':
            console.log('SET_TO_ONE Case called');
            item.quantity = 1;
            break;
          case 'SET_TO_ZERO':
            console.log('SET_TO_ZERO Case called');
            item.quantity = 0;
            break;
          default:
            return state;
        }
      } else {
        console.log('ID of item not found');
      }
    },
    // Updates subtotal based on cart items
    setSubtotal: (state) => {
      const { cart } = state.order;
      state.order.subtotal = 0;

      // iterates through each cart item
      cart.forEach((item) => {
        // add each item to subtotal
        state.order.subtotal += item.price * item.quantity;
      });
    },
  },
});

export const {
  setHasValue,
  setFieldValue,
  setIsValid,
  setFieldCounter,
  setErrorMessage,
  setQuantity,
  setSubtotal,
} = contactFormSlice.actions;

export const contactFormReducer = contactFormSlice.reducer;
