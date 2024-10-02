"use client";
import type { PayloadAction } from '@reduxjs/toolkit';
import { useAppSelector, useAppDispatch, setFieldValue, setFieldError, setFieldErrorMessage, setFieldCounter, setFieldRequired  } from '@/lib';
import { nameRegex, emailRegex, phoneRegex, subjectRegex, descriptionRegex, nameErrorMessage, emailErrorMessage, phoneErrorMessage, subjectErrorMessage, descriptionErrorMessage, requiredErrorMessage } from '@/lib/constants';
import type { ContactFormState } from '@/types';

const ContactForm = () => {

  // Access values from state object with useAppSelector hook
  const { firstName, lastName, email, phone, subject, description } = useAppSelector((state) => state.contactForm);
  const dispatch = useAppDispatch();

  // Field is limited to interface keys: firstName, lastName, etc
  type ContactFormField = keyof ContactFormState; 

  // Function that handles validation and updates value state, error state, and character counter state
  const handleField = (
    field: ContactFormField, // Accepts field name
    inputValue: string, // Accepts current value in input field
    regex: RegExp, // Accepts a Regex pattern
    errorState: boolean, // Accepts current error state
    setFieldValueAction: (payload: { field: ContactFormField, value: string }) // Accepts value state action creator function
     => PayloadAction<{ field: string; value: string }>,
    setFieldErrorAction: (payload: { field: ContactFormField, value: boolean }) // Accepts error state action creator function
     => PayloadAction<{ field: string; value: boolean }>,
    setFieldCounterAction?: (payload: {field: ContactFormField, value: number }) // Accepts counter state action creator function
     => PayloadAction<{ field: string; value: number }> 
  ) => {

    // If input matches regex pattern
    if (regex.test(inputValue)) {
      dispatch(setFieldValueAction( {field: field, value: inputValue })); // Update field's state with current value
      if (errorState) { // If error was toggled on
        dispatch(setFieldErrorAction({ field: field, value: false })); //  Then toggle error off
      }
      // If field is subject or description
      if (field === 'subject' || field === 'description') {
        setFieldCounterAction && dispatch(setFieldCounterAction({ field: field, value: inputValue.length })); // Then update counter
      }
    // If input does not match regex pattern
    } else {
      if (!errorState) { // And if error state was toggled off
        dispatch(setFieldErrorAction({ field: field, value: true })); // Then toggle error on
      }
    }
  };
  // Function returns all the empty fields
  const findEmptyFields = (fields: { [key: string]: string }): string[] => {
    const emptyFields: string[] = []; // Array to store all empty fields
    for (const [fieldName, value] of Object.entries(fields)){ // Converts key:value to [key,value]
      if (value.trim() === '') { // Push all empty fields to array
        emptyFields.push(fieldName);
      };
    };
    return emptyFields;
  };

  // Error message component code
  const ErrorMessage = (fieldError: string) => {
    return (
      <span>
        {fieldError}
      </span>
    )
  }
  // TO DO: display length within field value and not subject state's length. Counter should be able to exceed limit 
  const SubjectCounter = () => {
    return (
      <span>{subject.counter}/60</span>
    )
  } 
  // Displays description character count
  const DescriptionCounter = () => {
    return (
      <span>{description.counter}/250</span>
    )
  }
  // TO DO: Make dynamic character counter for subject and description
  // const messageCounter = () => {
  //   <span>{counter}/{charLimit}</span>
  // }

  // Custom interface to type each form field
  interface FormElements extends HTMLFormControlsCollection { // HTMLFormControlsCollection represents all the form controls
    firstName: HTMLInputElement;
    lastName: HTMLInputElement;
    email: HTMLInputElement;
    phone: HTMLInputElement;
    subject: HTMLInputElement;
    description: HTMLTextAreaElement;
  } 
  // Function that handles form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget.elements as FormElements // Forms constant represents all form elements

    // Values currently inputted by user
    const firstNameValue = form.firstName.value; // Value property comes from HTMLInputElement type
    const lastNameValue = form.lastName.value;
    const emailValue = form.email.value;
    const phoneValue = form.phone.value;
    const descriptionValue = form.description.value;

    // Checks if required fields are filled
    const emptyFields = findEmptyFields({
      firstName: firstNameValue,
      lastName: lastNameValue,
      email: emailValue,
      description: descriptionValue
    });
    // TO DO: If any required fields are empty, highlight empty required fields in red and display error message

    // Executes validation and state update for first name, last name, email, and phone fields
    handleField('firstName', firstNameValue, nameRegex, firstName.error, setFieldValue, setFieldError);
    handleField('lastName', lastNameValue, nameRegex, lastName.error, setFieldValue, setFieldError)
    handleField('email', emailValue, emailRegex, email.error, setFieldValue, setFieldError)
    handleField('phone', phoneValue, phoneRegex, phone.error, setFieldValue, setFieldError)
    // TO DO: Invoke function that generates and sends email to test email 
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div>
        <label htmlFor="firstName">First Name:</label>
        <input
          id="firstName"
          name="firstName"
          type="text"
        /> {/* Renders error message if error state is true */}
        {firstName.error ? ErrorMessage(nameErrorMessage) : null}
      </div>
      <div>
        <label htmlFor="lastName">Last Name:</label>
        <input
          id="lastName"
          name="lastName"
          type="text"
        /> {/* Renders error message if error state is true */}
        {lastName.error ? ErrorMessage(nameErrorMessage) : null}
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          name="email"
          type="email"
          /> {/* Renders error message if error state is true */}
        {email.error ? ErrorMessage(emailErrorMessage) : null}
      </div>
      <div>
        <label htmlFor="phone">Phone:</label>
        <input
          id="phone"
          name="phone"
          type="tel"
        /> {/* Renders error message if error state is true */}
        {phone.error ? ErrorMessage(phoneErrorMessage) : null}
      </div>
      <div>
        <label htmlFor="subject">Subject:</label>
        <input
          id="subject"
          name="subject"
          type="text"
          onChange={(e) => {
            handleField(
              'subject',
              e.currentTarget.value,
              subjectRegex,
              subject.error,
              setFieldValue,
              setFieldError,
              setFieldCounter
            )
          }}
        />
        <SubjectCounter></SubjectCounter>
        {subject.error ? ErrorMessage(subjectErrorMessage) : null}
      </div>
      <div>
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          name="description"
          onChange={(e) => {
            handleField(
              'description',
              e.currentTarget.value,
              descriptionRegex,
              description.error,
              setFieldValue,
              setFieldError,
              setFieldCounter
            )
          }}
        />
        <DescriptionCounter></DescriptionCounter>
        {description.error ? ErrorMessage(descriptionErrorMessage) : null}
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