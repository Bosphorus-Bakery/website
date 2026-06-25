const fieldConfigBase = {
  firstName: {
    label: 'First name',
    invalid: 'Only letters and accented characters allowed',
    required: 'First name is required',
  },
  lastName: {
    label: 'Last name',
    invalid: 'Only letters and accented characters allowed',
    required: 'Last name is required',
  },
  email: {
    label: 'Email',
    invalid: 'Enter a valid email address',
    required: 'Email is required',
  },
  phone: {
    label: 'Phone',
    invalid: 'Enter a valid phone number',
    required: 'Phone is required',
  },
  message: {
    label: 'Message',
    invalid: 'Enter a valid value', // Here for consistency, cannot be triggered on form
    required: 'Message is required',
  },
  selectedDate: {
    label: 'Date',
    invalid: 'Pick a valid date',
    required: 'Date is required',
  },
  fallback: {
    label: 'This field',
    invalid: 'Enter a valid value',
    required: 'This field is required',
  },
} as const;

export const fieldConfig = fieldConfigBase;
