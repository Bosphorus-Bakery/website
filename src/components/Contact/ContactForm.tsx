"use client";
import type { PayloadAction } from '@reduxjs/toolkit';
import { useAppSelector, useAppDispatch, setFieldValue, setFieldError, setFieldErrorMessage, setFieldCounter, setHasValue } from '@/lib';
import { nameRegex, emailRegex, phoneRegex, subjectRegex, descriptionRegex, nameErrorMessage, emailErrorMessage, phoneErrorMessage, subjectErrorMessage, descriptionErrorMessage, requiredErrorMessage, subjectLimit, descriptionLimit } from '@/lib/constants';
import type { FieldState, ContactFormState, ContactFormField, FieldLength } from '@/types';
import { contactFormStyles } from '@/styles';

const ContactForm = () => {

  // Access values from state object with useAppSelector hook
  const { firstName, lastName, email, phone, subject, description } = useAppSelector((state) => state.contactForm);
  const dispatch = useAppDispatch();

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
  e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>, 
//   setFieldCounter: (payload: {field: ContactFormField, value: number }) // Accepts counter state action creator function
//  => PayloadAction<{ field: string; value: number }> 
) => {
  const currentInputLength = e.currentTarget.value.length;
  dispatch(setFieldCounter({ field: field, value: currentInputLength }));
 }

  // Function accepts object of field names and their value returns all the empty fields
  const findEmptyFields = (fieldsObject: { [key: string]: string }): string[] => {
    const emptyFields: string[] = []; // Array to store all empty fields
    for (const [fieldName, value] of Object.entries(fieldsObject)){ // Converts key : value pair to [key, value] tuple
      if (value.trim() === '') { // Check if fields are empty
        emptyFields.push(fieldName); // Push all empty fields to array
      };
    }; 
    return emptyFields
  };

  // Custom interface to type each form field
  interface FormElements extends HTMLFormControlsCollection { // HTMLFormControlsCollection represents all the form controls
    firstName: HTMLInputElement;
    lastName: HTMLInputElement;
    email: HTMLInputElement;
    phone: HTMLInputElement;
    subject: HTMLInputElement;
    description: HTMLTextAreaElement;
  } 
  // On change function that detects if input field has value
  const myOnChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>, field: ContactFormField
  ) => {

    console.log('myOnBlur invoked');

    const fieldValue = e.currentTarget.value // Get field's value

    // Updates hasValue state 
    if (fieldValue.trim() === '') {
      dispatch(setHasValue({ field: field, value: false }));
    } else {
      dispatch(setHasValue({ field: field, value: true }));
    };

    // TO DO: Incorporate handleField logic 
  }
  // On blur function that applies error styling if required field is empty or has invalid input
  const myOnBlur = (e: React.FocusEvent<HTMLInputElement>, fieldState: FieldState) => {
    // Perform check is hasValue is false or error message is true then apply red outline
    console.log(`Error state: ${fieldState.error}`);
    console.log(`hasValue state: ${fieldState.hasValue}`);
    // TO DO: If hasValue is false || error is true then apply error styling
    fieldState.hasValue? e.currentTarget.className = '' : e.currentTarget.className = contactFormStyles.errorBorder;
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
    const subjectValue = form.subject.value;
    const descriptionValue = form.description.value;

    // Gets array of empty fields
    const emptyFields = findEmptyFields({
      firstName: firstNameValue,
      lastName: lastNameValue,
      email: emailValue,
      subject: subjectValue,
      description: descriptionValue
    });

    // TO DO: If any required fields are empty, highlight empty required fields in red and display error message

    // Executes validation and state update for first name, last name, email, and phone fields
    handleField('firstName', firstNameValue, nameRegex, firstName.error, setFieldValue, setFieldError);
    handleField('lastName', lastNameValue, nameRegex, lastName.error, setFieldValue, setFieldError)
    handleField('email', emailValue, emailRegex, email.error, setFieldValue, setFieldError)
    handleField('phone', phoneValue, phoneRegex, phone.error, setFieldValue, setFieldError)
    handleField('subject', subjectValue, subjectRegex, subject.error, setFieldValue, setFieldError)
    handleField('description', descriptionValue, descriptionRegex, description.error, setFieldValue, setFieldError)
    // TO DO: Invoke function that generates and sends email to test email 
  }

  // Error message component code
  const ErrorMessage = (fieldError: string) => {
    return (
      <span>
        {fieldError}
      </span>
    )
  }
  // Character counter component code
  const CharacterCounter = (counter: number, characterLimit: number) => {
    return (
      <span>{counter}/{characterLimit}</span>

    )
  }
  // Contact form component code
  return (
    <form onSubmit={handleSubmit} noValidate>
      <div>
        <label htmlFor="firstName">First Name:</label>
        <input
          id="firstName"
          name="firstName"
          type="text"
          onChange={(e) => {myOnChange(e, 'firstName')}}
          onBlur={(e) => {
              myOnBlur(e, firstName)
          }}
          // className={firstName.hasValue ? '' : contactFormStyles.errorBorder}
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
            handleCounter(
              'subject', e)
          }}
        /> {/* Counter is optional field and defaults to 0 as fallback */}
        {CharacterCounter(subject.counter ??  0, subjectLimit)}
        {subject.error ? ErrorMessage(subjectErrorMessage) : null}
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