"use client";
import type { PayloadAction } from '@reduxjs/toolkit';
import { useAppSelector, useAppDispatch, setFirstName, toggleFirstNameError, setLastName, toggleLastNameError, setEmail, toggleEmailError, setPhone, togglePhoneError, setSubject, toggleSubjectError, setSubjectCounter, setDescription, toggleDescriptionError, setDescriptionCounter, toggleRequiredError, setSubjectError } from '@/lib';
import { nameRegex, emailRegex, phoneRegex, subjectRegex, descriptionRegex, nameErrorMessage, emailErrorMessage, phoneErrorMessage, subjectErrorMessage, descriptionErrorMessage, requiredErrorMessage } from '@/lib/constants';
const ContactForm = () => {

  // To access values from state object
  const { firstName, firstNameError, lastName, lastNameError, email, emailError, phone, phoneError, subject, subjectError, subjectCounter, description, descriptionError, descriptionCounter } = useAppSelector((state) => state.contactForm);
  const dispatch = useAppDispatch();

  // Generic function to handle form field's validation and state
  const handleField = (
    fieldValue: string, // Value of input field
    regex: RegExp, // Regex to validate the field
    errorState: boolean, // Current error state of field
    setFieldAction: (value: string) => PayloadAction<string>, // Action creator to set field's state
    setErrorAction: (value: boolean) => PayloadAction<boolean> // Action creator to toggle field's error state
  ) => {
    if (regex.test(fieldValue)) { // If input is valid then update state and toggle off error
      dispatch(setFieldAction(fieldValue)); 
      if (errorState) {
        dispatch(setErrorAction(false));
      }
    } else { // If input is invalid then toggle on error
      if (!errorState) {
        dispatch(setErrorAction(true));
      }
    }
  }
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
      <span>{subjectCounter}/60</span>
    )
  } 
  // Displays description character count
  const DescriptionCounter = () => {
    return (
      <span>{descriptionCounter}/250</span>
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
    const form = e.currentTarget.elements as FormElements // Forms constant represents all fields 

    // Extract values from each field  
    const firstNameValue = form.firstName.value; // Value property comes from HTMLInputElement type
    const lastNameValue = form.lastName.value;
    const emailValue = form.email.value;
    const phoneValue = form.phone.value;

    /* Once a user clicks submit:
    Each field's value is grabbed, validated, and used to update the state if passed regex
    When to check if fields are empty?  
    */

    // Update each field's state
    handleField(firstNameValue, nameRegex, firstNameError, setFirstName, toggleFirstNameError);
    handleField(lastNameValue, nameRegex, lastNameError, setLastName, toggleLastNameError);
    handleField(emailValue, emailRegex, emailError, setEmail, toggleEmailError);
    handleField(phoneValue, phoneRegex, phoneError, setPhone, togglePhoneError);
    // handleField(subjectValue, subjectRegex, subjectError, setSubject, toggleSubjectError);
    // handleField(descriptionValue, descriptionRegex, descriptionError, setDescription, toggleDescriptionError);

    // TO DO: Generate and send email to bakery 
  }

  // Function that tracks subject field input and length
  const handleSubjectChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const subjectValue = e.currentTarget.value;
    handleField(subjectValue, subjectRegex, subjectError, setSubject, setSubjectError);
    dispatch(setSubjectCounter(subjectValue.length));
  }
  // Function that tracks descriptions field input and length
  const handleDescriptionCounter = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const descriptionValue = e.currentTarget.value;
    handleField(descriptionValue, descriptionRegex, descriptionError, setDescription, toggleDescriptionError);
    dispatch(setDescriptionCounter(descriptionValue.length));
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
          onChange={handleSubjectChange}
        />
        <SubjectCounter></SubjectCounter>
        {subjectError ? ErrorMessage(subjectErrorMessage) : null}
      </div>
      <div>
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          name="description"
          onChange={handleDescriptionCounter}
        />
        <DescriptionCounter></DescriptionCounter>
        {descriptionError ? ErrorMessage(descriptionErrorMessage) : null}
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