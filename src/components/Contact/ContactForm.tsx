'use client';
import type { PayloadAction } from '@reduxjs/toolkit';
import {
  useAppSelector,
  useAppDispatch,
  setHasValue,
  setFieldValue,
  setIsValid,
  setFieldCounter,
  setErrorMessage,
  resetContactForm,
} from '@/lib';
import { useState } from 'react';
import type { ContactField, ContactFields } from '@/types';
import {
  nameRegex,
  emailRegex,
  phoneRegex,
  messageRegex,
  fieldConfig,
} from '@/lib/constants';
import { formStyles } from '@/styles';

const ContactForm = () => {
  // Get contact info form state
  const { firstName, lastName, email, phone, message } = useAppSelector(
    (state) => state.contactForm.contactInfo,
  );
  const dispatch = useAppDispatch();

  const [submitStatus, setSubmitStatus] = useState<
    'idle' | 'success' | 'error'
  >('idle');

  // Validates field's input
  const validateField = (regex: RegExp, value: string) => {
    return regex.test(value) ? true : false;
  };

  // Function that detects value and validates it on change
  const handleOnChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
    fieldName: keyof ContactFields,
    regex: RegExp,
  ) => {
    const value = e.currentTarget.value;

    // If field is empty then update state
    if (value.trim() === '') {
      dispatch(setHasValue({ field: fieldName, value: false }));

      // If field has a value then update state
    } else {
      dispatch(setHasValue({ field: fieldName, value: true }));

      // If field value passes its regex then update state
      if (validateField(regex, value)) {
        dispatch(setIsValid({ field: fieldName, value: true }));
        dispatch(setFieldValue({ field: fieldName, value: value }));

        // If field value fails regex then update state
      } else {
        dispatch(setIsValid({ field: fieldName, value: false }));
      }
    }
  };

  // Function reads error state then displays message on blur
  const handleOnBlur = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
    fieldName: keyof ContactFields,
    field: ContactField,
  ) => {
    // If field is empty then display a field-specific required error
    if (!field.hasValue) {
      dispatch(
        setErrorMessage({
          field: fieldName,
          value: fieldConfig[fieldName].required,
        }),
      );
      e.currentTarget.classList.add(formStyles['error-border']);

      // If field has invalid value then display incorrect format error and apply error styles
    } else {
      if (!field.isValid) {
        dispatch(
          setErrorMessage({
            field: fieldName,
            value:
              fieldConfig[fieldName]?.invalid ??
              fieldConfig['fallback'].invalid,
          }),
        );
        e.currentTarget.classList.add(formStyles['error-border']);

        // If field has a valid value then clear error message and remove error styling
      } else {
        dispatch(setErrorMessage({ field: fieldName, value: '' }));
        e.currentTarget.classList.remove(formStyles['error-border']);
      }
    }
  };

  // Error message conditionally renders based on state
  const ErrorMessage = (field: ContactField) => {
    return (
      <p
        className={`
          ${formStyles['error']} 
          ${field.errorMessage ? formStyles['visible'] : formStyles['invisible']}
        `}
      >
        {field.errorMessage || '\u00A0'}
      </p>
    );
  };

  // Function updates field's character counter on change
  const handleCounter = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
    fieldName: keyof ContactFields,
  ) => {
    const length = e.currentTarget.value.length;
    dispatch(setFieldCounter({ field: fieldName, value: length }));
  };

  // Character counter component code
  const CharacterCounter = (counter: number, characterLimit: number) => {
    const remainingChars: number = characterLimit - counter;
    return (
      <span className={formStyles['character-counter']}>{remainingChars} </span>
    );
  };

  // Function submits validated form data
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const ContactFormFields = {
      firstName,
      lastName,
      email,
      phone,
      message,
    };

    // Iterate through each fields state and checks if any field is empty or has invalid value
    let isFormValid = true;

    Object.entries(ContactFormFields).forEach(([fieldName, fieldState]) => {
      const key = fieldName as keyof ContactFields;

      // Get the element for each field using its name attribute
      const fieldElement = e.currentTarget.elements.namedItem(key) as
        | HTMLInputElement
        | HTMLTextAreaElement
        | null;

      if (!fieldState.hasValue) {
        dispatch(
          setErrorMessage({
            field: key,
            value:
              fieldConfig[key]?.required ?? fieldConfig['fallback'].required,
          }),
        );
        fieldElement?.classList.add(formStyles['error-border']);
        isFormValid = false;
      } else if (!fieldState.isValid) {
        dispatch(
          setErrorMessage({
            field: key,
            value: fieldConfig[key]?.invalid ?? fieldConfig['fallback'].invalid,
          }),
        );
        fieldElement?.classList.add(formStyles['error-border']);
        isFormValid = false;
      }
    });

    if (!isFormValid) {
      return;
    }

    // Flatten ContactFormFields into a plain { fieldName: value } object for the request body
    const formData = Object.fromEntries(
      Object.entries(ContactFormFields).map(([fieldName, fieldState]) => [
        fieldName,
        fieldState.value,
      ]),
    );

    // HTTP POST request to /api/contact with form data in the request body
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // Stringify the formData object to send in the request body
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (!result.success) {
        console.error('Failed to send contact form', result.error);
        setSubmitStatus('error');
        return;
      }

      dispatch(resetContactForm());
      setSubmitStatus('success');
    } catch (error) {
      console.error('Failed to send contact form', error);
      setSubmitStatus('error');
    }
  };

  // If the form was submitted successfully, show a confirmation instead of the form
  if (submitStatus === 'success') {
    return (
      <div className={formStyles['success-message']}>
        <p>Thanks for reaching out! We'll get back to you shortly.</p>
      </div>
    );
  }

  // Contact form component code
  return (
    <form
      className={formStyles['form-container']}
      onSubmit={handleSubmit}
      noValidate
    >
      <p
        className={`
          ${formStyles['error']}
          ${submitStatus === 'error' ? formStyles['visible'] : formStyles['invisible']}
        `}
      >
        {submitStatus === 'error'
          ? 'Something went wrong sending your message. Please try again.'
          : ' '}
      </p>
      <div className={formStyles['field-container']}>
        <label className={formStyles['label']} htmlFor="firstName">
          {fieldConfig.firstName.label}:
        </label>
        <input
          className={formStyles['field']}
          id="firstName"
          name="firstName"
          type="text"
          onChange={(e) => {
            handleOnChange(e, 'firstName', nameRegex);
          }}
          onBlur={(e) => {
            handleOnBlur(e, 'firstName', firstName);
          }}
        />
        {ErrorMessage(firstName)}
      </div>
      <div className={formStyles['field-container']}>
        <label className={formStyles['label']} htmlFor="lastName">
          {fieldConfig.lastName.label}:
        </label>
        <input
          className={formStyles['field']}
          id="lastName"
          name="lastName"
          type="text"
          onChange={(e) => {
            handleOnChange(e, 'lastName', nameRegex);
          }}
          onBlur={(e) => {
            handleOnBlur(e, 'lastName', lastName);
          }}
        />
        {ErrorMessage(lastName)}
      </div>
      <div className={formStyles['field-container']}>
        <label className={formStyles['label']} htmlFor="email">
          {fieldConfig.email.label}:
        </label>
        <input
          className={formStyles['field']}
          id="email"
          name="email"
          type="email"
          onChange={(e) => {
            handleOnChange(e, 'email', emailRegex);
          }}
          onBlur={(e) => {
            handleOnBlur(e, 'email', email);
          }}
        />
        {ErrorMessage(email)}
      </div>
      <div className={formStyles['field-container']}>
        <label className={formStyles['label']} htmlFor="phone">
          {fieldConfig.phone.label}:
        </label>
        <input
          className={formStyles['field']}
          id="phone"
          name="phone"
          type="tel"
          onChange={(e) => {
            handleOnChange(e, 'phone', phoneRegex);
          }}
          onBlur={(e) => {
            handleOnBlur(e, 'phone', phone);
          }}
        />
        {ErrorMessage(phone)}
      </div>
      <div className={formStyles['field-container']}>
        <label className={formStyles['label']} htmlFor="message">
          {fieldConfig.message.label}:
        </label>
        <div className={formStyles['message-wrapper']}>
          <textarea
            className={`${formStyles['field']} ${formStyles['message']}`}
            id="message"
            name="message"
            placeholder="Tell us how we can help"
            onChange={(e) => {
              handleOnChange(e, 'message', messageRegex);
              handleCounter(e, 'message');
            }}
            onBlur={(e) => {
              handleOnBlur(e, 'message', message);
            }}
          />
        </div>
        {CharacterCounter(message.counter ?? 0, 250)}
        {ErrorMessage(message)}
      </div>
      <button className="button" type="submit">
        Submit
      </button>
    </form>
  );
};

export default ContactForm;
