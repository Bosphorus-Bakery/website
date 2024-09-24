"use client";
import type { PayloadAction } from '@reduxjs/toolkit';
import { useAppSelector, useAppDispatch, setFirstName, toggleFirstNameError, setLastName, toggleLastNameError, setEmail, toggleEmailError, setPhone, togglePhoneError, setSubject, toggleSubjectError, setSubjectCounter, setDescription, toggleDescriptionError, setDescriptionCounter, toggleRequiredError } from '@/lib';
import { nameRegex, emailRegex, phoneRegex, subjectRegex, descriptionRegex } from '@/components/Contact';
import { NameError, EmailError, PhoneError, SubjectError, DescriptionError, RequiredError } from '@/components/Contact';
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
    toggleErrorAction: () => PayloadAction<void> // Action creator to toggle field's error state
  ) => {
    if (regex.test(fieldValue)) { // If input is valid then update state and toggle off error
      dispatch(setFieldAction(fieldValue)); 
      if (errorState) {
        dispatch(toggleErrorAction());
      }
    } else { // If input is invalid then toggle on error
      if (!errorState) {
        dispatch(toggleErrorAction());
      }
    }
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

  // Function that tracks subject character count as user inputs
  const handleSubjectCounter = (e: React.FormEvent<HTMLInputElement>) => {
    const subjectLength =  e.currentTarget.value.length;
    dispatch(setSubjectCounter(subjectLength));
  }

  // Function that tracks description character count as user inputs
  const handleDescriptionCounter = (e: React.FormEvent<HTMLTextAreaElement>) => {
    const descriptionLength =  e.currentTarget.value.length;
    dispatch(setDescriptionCounter(descriptionLength));
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
    const subjectValue = form.phone.value;
    const descriptionValue = form.phone.value;

    // Update each field's state
    handleField(firstNameValue, nameRegex, firstNameError, setFirstName, toggleFirstNameError);
    handleField(lastNameValue, nameRegex, lastNameError, setLastName, toggleLastNameError);
    handleField(emailValue, emailRegex, emailError, setEmail, toggleEmailError);
    handleField(phoneValue, phoneRegex, phoneError, setPhone, togglePhoneError);
    handleField(subjectValue, subjectRegex, subjectError, setSubject, toggleSubjectError);
    handleField(descriptionValue, descriptionRegex, descriptionError, setDescription, toggleDescriptionError);

    /* Once a user clicks submit:
    Each field's value is grabbed, validated, and used to update the state if passed regex
    When to check if fields are empty? 
    



    */

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
        {firstNameError ? (<NameError></NameError>) : null}
      </div>
      <div>
        <label htmlFor="lastName">Last Name:</label>
        <input
          id="lastName"
          name="lastName"
          type="text"
        /> {/* Renders error message if error state is true */}
        {lastNameError ? (<NameError></NameError>) : null}
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          name="email"
          type="email"
          /> {/* Renders error message if error state is true */}
        {emailError ? (<EmailError></EmailError>) : null}
      </div>
      <div>
        <label htmlFor="phone">Phone:</label>
        <input
          id="phone"
          name="phone"
          type="tel"
        /> {/* Renders error message if error state is true */}
        {phoneError ? (<PhoneError></PhoneError>) : null}
      </div>
      <div>
        <label htmlFor="subject">Subject:</label>
        <input
          id="subject"
          name="subject"
          type="text"
          onChange={handleSubjectCounter}
        />
        <SubjectCounter></SubjectCounter>
        {subjectError ? (<SubjectError></SubjectError>) : null}
      </div>
      <div>
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          name="description"
          onChange={handleDescriptionCounter}
        />
        <DescriptionCounter></DescriptionCounter>
        {descriptionError ? (<DescriptionError></DescriptionError>) : null}
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