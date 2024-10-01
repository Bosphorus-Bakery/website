"use client";
import type { PayloadAction } from '@reduxjs/toolkit';
import { useAppSelector, useAppDispatch, setFieldValue, setFieldError, setFieldErrorMessage, setFieldCounter, setFieldRequired  } from '@/lib';
import { nameRegex, emailRegex, phoneRegex, subjectRegex, descriptionRegex, nameErrorMessage, emailErrorMessage, phoneErrorMessage, subjectErrorMessage, descriptionErrorMessage, requiredErrorMessage } from '@/lib/constants';
import type { ContactFormState } from '@/types';

const ContactForm = () => {
  // To access values from state object
  const { firstName, lastName, email, phone, subject, description } = useAppSelector((state) => state.contactForm);
  const dispatch = useAppDispatch();

  // Generic function handles validation, value state, and error state of form fields
  const handleField = (
    field: string, // 'firstName', 'lastName', 'email', 'phone', 'subject', or 'description'
    inputValue: string, // Arg 1: Current value in input field
    regex: RegExp, // Arg 2: Regex pattern
    errorState: boolean, // Arg 3: Current error state
    setFieldValueAction: (payload: { field: string, value: string }) => PayloadAction<{ field: string; value: string }>, // Arg 4: Action creator to set field's value state
    setFieldErrorAction: (payload: { field: string, value: boolean }) => PayloadAction<{ field: string; value: boolean }> // Arg 5: Action creator to set field's error state
  ) => {
    if (regex.test(inputValue)) { // If input matches regex pattern
      dispatch(setFieldValueAction( {field, value: inputValue }));  // Then update state
      if (errorState) { // If error was toggled on then toggle off
        dispatch(setFieldErrorAction({ field, value: false })); 
      }
    } else { // If input is invalid
      if (!errorState) { // And if error state was toggled off then toggle on
        dispatch(setFieldErrorAction({ field, value: true }));
      };
    };
  };

  // TO DO: Separate validation into another function
  // const validateField = (
  //   value:string,
  //   regex: RegExp, 
  //   errorState: boolean): boolean {
    
  // }

 // Function handles validation, value state, error state, and character count of subject and description
 const handleDetailsChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>, regex: RegExp, errorState: boolean, setValue: (value: string) => PayloadAction<string>, setError: (value: boolean) => PayloadAction<boolean>, setCounter: (value: number) => PayloadAction<number>) => {
    const detailValue = e.currentTarget.value;
    handleField(detailValue, regex, errorState, setValue, setError);
    dispatch(setCounter(detailValue.length));
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
  // Displays subject character count
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
    // If any required fields are empty, highlight empty required fields in red and display error message

    // Update each field's state
    handleField('firstName', firstNameValue, nameRegex, firstName.error, setFieldValue, setFieldError)
    // handleField(lastNameValue, nameRegex, lastNameError, setLastName, setLastNameError);
    // handleField(emailValue, emailRegex, emailError, setEmail, setEmailError);
    // handleField(phoneValue, phoneRegex, phoneError, setPhone, setPhoneError);
    // TO DO: Generate and send email to bakery 
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
        {firstNameError ? ErrorMessage(nameErrorMessage) : null}
      </div>
      <div>
        <label htmlFor="lastName">Last Name:</label>
        <input
          id="lastName"
          name="lastName"
          type="text"
        /> {/* Renders error message if error state is true */}
        {lastNameError ? ErrorMessage(nameErrorMessage) : null}
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          name="email"
          type="email"
          /> {/* Renders error message if error state is true */}
        {emailError ? ErrorMessage(emailErrorMessage) : null}
      </div>
      <div>
        <label htmlFor="phone">Phone:</label>
        <input
          id="phone"
          name="phone"
          type="tel"
        /> {/* Renders error message if error state is true */}
        {phoneError ? ErrorMessage(phoneErrorMessage) : null}
      </div>
      <div>
        <label htmlFor="subject">Subject:</label>
        <input
          id="subject"
          name="subject"
          type="text"
          onChange={(e) => handleDetailsChange(e, subjectRegex, subjectError, setSubject, setSubjectError, setSubjectCounter)}
        />
        <SubjectCounter></SubjectCounter>
        {subjectError ? ErrorMessage(subjectErrorMessage) : null}
      </div>
      <div>
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          name="description"
          onChange={(e) => handleDetailsChange(e, descriptionRegex, descriptionError, setDescription, setDescriptionError, setDescriptionCounter)}
        />
        <DescriptionCounter></DescriptionCounter>
        {descriptionError ? ErrorMessage(descriptionErrorMessage) : null}
      </div>
      <div>
      {Error ? ErrorMessage(requiredErrorMessage) : null}
        <button
         type="submit"> Submit 
        </button>
      </div>
    </form>
  )
}

export default ContactForm;