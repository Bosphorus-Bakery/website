"use client";
import type { PayloadAction } from '@reduxjs/toolkit';
import { useAppSelector, useAppDispatch, setHasValue, setFieldValue, setIsValid, setFieldCounter, setErrorMessage } from '@/lib';
import { nameRegex, emailRegex, phoneRegex, subjectRegex, descriptionRegex, 
  nameErrorMessage, emailErrorMessage, phoneErrorMessage, subjectErrorMessage, descriptionErrorMessage, requiredErrorMessage, 
  subjectLimit, descriptionLimit } from '@/lib/constants';
import requiredFields from '@/lib/constants/requiredFields';
import type { FieldState, ContactFormState, ContactFormField } from '@/types';
import { contactFormStyles } from '@/styles';

const ContactForm = () => {

  // The useAppSelector hook lets us access the state of each field
  const { firstName, lastName, email, phone, subject, description } = useAppSelector((state) => state.contactForm);
  const dispatch = useAppDispatch();

  const validateInput = (inputValue: string, regex: RegExp) => {
    return regex.test(inputValue) ? true : false;
  }

  // On change function that detects if input field has value
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>, field: ContactFormField, regex: RegExp
  ) => {
    const value = e.currentTarget.value
    // Check if field has a value and update hasValue accordingly
    if (value.trim() === '') {
      dispatch(setHasValue({ field: field, value: false }));
    } else {
      dispatch(setHasValue({ field: field, value: true }));
        // Check is value is valid and update isValid accordingly
      validateInput(value, regex) ? setIsValid({ field: field, value: true }) : setIsValid({ field: field, value: false  })
    }    
  };

  // Function that handles validation and updates value state, error state, and character counter state upon form submission
  const handleField = (
    field: ContactFormField, // Accepts field name
    inputValue: string, // Accepts current value in input field
    regex: RegExp, // Accepts a Regex pattern
    errorState: boolean, // Accepts current error state
    setFieldValueAction: (payload: { field: ContactFormField, value: string }) // Accepts value state action creator function
     => PayloadAction<{ field: string; value: string }>,
    setFieldErrorAction: (payload: { field: ContactFormField, value: boolean }) // Accepts error state action creator function
     => PayloadAction<{ field: string; value: boolean }>
  ) => {

    // If input matches regex pattern
    if (regex.test(inputValue)) {
      dispatch(setFieldValueAction( {field: field, value: inputValue })); // Update field's state with current value
      if (errorState) { // If error was toggled on
        dispatch(setFieldErrorAction({ field: field, value: false })); //  Then toggle error off
      }
    // If input does not match regex pattern
    } else {
      if (!errorState) { // And if error state was toggled off
        dispatch(setFieldErrorAction({ field: field, value: true })); // Then toggle error on
      }
    }
  };

 // Function that updates field's character counter on change
 const handleCounter = (field: ContactFormField, 
  e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>
 ) => {
  const currentInputLength = e.currentTarget.value.length;
  dispatch(setFieldCounter({ field: field, value: currentInputLength }));
 }

  // Custom interface to type each form field
  interface FormElements extends HTMLFormControlsCollection { // HTMLFormControlsCollection represents all the form controls
    firstName: HTMLInputElement;
    lastName: HTMLInputElement;
    email: HTMLInputElement;
    phone: HTMLInputElement;
    subject: HTMLInputElement;
    description: HTMLTextAreaElement;
  } 

  // On blur function that applies error styling if required field is empty or has invalid input
  // TO DO: Treat required fields differently from optional fields
  const myOnBlur = (e: React.FocusEvent<HTMLInputElement>, fieldState: FieldState) => {
    // Perform check is hasValue is false or error message is true then apply red outline
    console.log(`Error state: ${fieldState.validInput}`);
    console.log(`hasValue state: ${fieldState.hasValue}`);
    // TO DO: Only show error message on blur
    if (!fieldState.hasValue) {
      e.currentTarget.className = contactFormStyles.errorBorder; // Make field red if no input
      // TO DO: Display required error message
    } else {
      e.currentTarget.classList.remove(contactFormStyles.errorBorder) // Remove red styling
    }
  }

  // Handle submit function that validates input and updates state
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget.elements as FormElements // Forms constant represents all form elements
    const firstNameValue = form.firstName.value; // Get each value from all fields
    const lastNameValue = form.lastName.value;
    const emailValue = form.email.value;
    const phoneValue = form.phone.value;
    const subjectValue = form.subject.value;
    const descriptionValue = form.description.value;

    handleField('firstName', firstNameValue, nameRegex, firstName.validInput, setFieldValue, setFieldError);
    handleField('lastName', lastNameValue, nameRegex, lastName.validInput, setFieldValue, setFieldError)
    handleField('email', emailValue, emailRegex, email.validInput, setFieldValue, setFieldError)
    handleField('phone', phoneValue, phoneRegex, phone.validInput, setFieldValue, setFieldError)
    handleField('subject', subjectValue, subjectRegex, subject.validInput, setFieldValue, setFieldError)
    handleField('description', descriptionValue, descriptionRegex, description.validInput, setFieldValue, setFieldError)
    // TO DO: Invoke function that generates and sends email to test email 
  }

  // Error message component code

  const ErrorMessage = (fieldError: string, field: FieldState) => {
    if (!field.validInput) {
      return (
        <span>
          {fieldError}
        </span>
      )
    }
  }
  // Character counter component code
  const CharacterCounter = (counter: number, characterLimit: number) => {
    return (
      <span>{counter}/{characterLimit}</span>
    )
  }
  // const errorMessageFunction = (field: FieldState , nameErrorMessage: string) => {
  //   if (!field.validInput) {
  //     ErrorMessage(nameErrorMessage)
  //   }
  // }


  // Contact form component code
  return (
    <form onSubmit={handleSubmit} noValidate>
      <div>
        <label htmlFor="firstName">First Name:</label>
        <input
          id="firstName"
          name="firstName"
          type="text"
          onChange={(e) => {handleOnChange(e, 'firstName')}}
          onBlur={(e) => {
              myOnBlur(e, firstName)
          }}
        />
        {ErrorMessage(nameErrorMessage, firstName)}
        {/* {firstName.validInput ? null : ErrorMessage(nameErrorMessage)} */}
      </div>
      <div>
        <label htmlFor="lastName">Last Name:</label>
        <input
          id="lastName"
          name="lastName"
          type="text"
        />
        {/* {lastName.validInput ? null : ErrorMessage(nameErrorMessage)} */}
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          name="email"
          type="email"
          />
        {/* {email.validInput ? null : ErrorMessage(emailErrorMessage)} */}
      </div>
      <div>
        <label htmlFor="phone">Phone:</label>
        <input
          id="phone"
          name="phone"
          type="tel"
        />
        {/* {phone.validInput ? null : ErrorMessage(phoneErrorMessage)} */}
      </div>
      <div>
        <label htmlFor="subject">Subject:</label>
        <input
          id="subject"
          name="subject"
          type="text"
          onChange={(e) => {
            handleCounter(
              'subject', e)
          }}
        /> {/* Counter is optional field and defaults to 0 as fallback */}
        {CharacterCounter(subject.counter ??  0, subjectLimit)}
        {/* {subject.validInput ? null: ErrorMessage(subjectErrorMessage)} */}
      </div>
      <div>
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          name="description"
          onChange={(e) => {
            handleCounter('description', e)
          }}
        />
        {CharacterCounter(description.counter ??  0, descriptionLimit)}
        {/* {description.validInput ? null : ErrorMessage(descriptionErrorMessage)} */}
      </div>
      <div>
        <button
         type="submit"> Submit 
        </button>
      </div>
    </form>
  )
}

export default ContactForm;