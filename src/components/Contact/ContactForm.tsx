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
} from '@/lib';
import type { ContactField, ContactFields } from '@/types';
import {
  nameRegex,
  emailRegex,
  phoneRegex,
  messageRegex,
  errorMessages,
  messageLimit,
} from '@/lib/constants';
import { formStyles } from '@/styles';

const ContactForm = () => {
  // Get contact info form state
  const { firstName, lastName, email, phone, message } = useAppSelector(
    (state) => state.contactForm.contactInfo,
  );
  const dispatch = useAppDispatch();

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
    // If field does not have value then display required error and apply error styles
    if (!field.hasValue) {
      dispatch(
        setErrorMessage({ field: fieldName, value: errorMessages['required'] }),
      );
      e.currentTarget.classList.add(formStyles['error-border']);

      // If field has invalid value then display incorrect format error and apply error styles
    } else {
      if (!field.isValid) {
        dispatch(
          setErrorMessage({
            field: fieldName,
            value: errorMessages[fieldName],
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

  // Error message component code
  const ErrorMessage = (field: ContactField) => {
    if (field.errorMessage !== '') {
      return <span className={formStyles['error']}>{field.errorMessage} </span>;
    }
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
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const ContactFormFields = {
      firstName,
      lastName,
      email,
      phone,
      message,
    };

    const fieldValues = Object.entries(ContactFormFields) // Transforms state object into array of key value pairs
      .map(([fieldName, fieldValue]) => ({
        // Iterates through key value pairs and extracts the field name and field value
        field: fieldName,
        value: fieldValue,
      }));
    console.log('handleSubmit called');
    console.log(`fieldValues: ${fieldValues}`);
  };

  // Contact form component code
  return (
    <form
      className={formStyles['form-container']}
      onSubmit={handleSubmit}
      noValidate
    >
      <div className={formStyles['field-container']}>
        <label className={formStyles['label']} htmlFor="firstName">
          First Name:*
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
          Last Name:*
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
          Email:*
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
          Phone:*
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
          Message:*
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
