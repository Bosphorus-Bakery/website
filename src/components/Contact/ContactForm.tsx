"use client";
import type { PayloadAction } from '@reduxjs/toolkit';
import { useAppSelector, useAppDispatch, setFirstName, toggleFirstNameError, setLastName, toggleLastNameError, setEmail, toggleEmailError, setPhone, togglePhoneError, setSubject, toggleSubjectError, setSubjectCounter, setDescription, toggleDescriptionError, setDescriptionCounter, submitForm, clearError } from '@/lib';
import { nameRegex, emailRegex, phoneRegex, subjectRegex, descriptionRegex } from '@/components/Contact/Regex';

const ContactForm = () => {

  // Get values from state object
  const { firstName, firstNameError, lastName, lastNameError, email, emailError, phone, phoneError, subject, subjectError, subjectCounter, description, descriptionError, descriptionCounter, isSubmitting, error } = useAppSelector((state) => state.contactForm);
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

  // // Function that validates and updates firstName state
  // const handleFirstName = (firstNameValue: string) => {
  //   if (nameRegex.test(firstNameValue)) { // If firstName input is valid then updates firstName state
  //     dispatch(setFirstName(firstNameValue)); 
  //     if (firstNameError) { // Toggles off firstName error
  //       dispatch(toggleFirstNameError()); 
  //     } 
  //   } else { // If firstName input is invalid then toggle on firstNameError 
  //     if (!firstNameError) {
  //       dispatch(toggleFirstNameError());
  //     }    
  //   }
  // }  // Function that validates and updates lastName state
  // const handleLastName = (lastNameValue: string) => {
  //   if (nameRegex.test(lastNameValue)) { // If lastName input is valid then updates lastName state
  //     dispatch(setLastName(lastNameValue));
  //     if (lastNameError) { // Toggles off lastName error
  //       dispatch(toggleLastNameError());
  //     }
  //   } else { // If lastName input is invalid then toggle on lastNameError
  //     if (!lastNameError) {
  //       dispatch(toggleLastNameError());
  //     }    
  //   }
  // } // Function that validates and updates email state
  // const handleEmail = (emailValue: string) => {
  //   if (emailRegex.test(emailValue)) {
  //     dispatch(setEmail(emailValue));
  //     if (emailError) {
  //       dispatch(toggleEmailError());
  //     }
  //   } else { // If email input is invalid then toggle error
  //     if (!emailError) {
  //       dispatch(toggleEmailError());
  //     }    
  //   }
  // }

  // // Function that validates and updates phone state
  // const handlePhone = (phoneValue: string) => {
  //   if (phoneRegex.test(phoneValue)) {
  //     dispatch(setPhone(phoneValue));
  //     if (phoneError) {
  //       dispatch(togglePhoneError());
  //     }
  //   } else { // If phone input is invalid then toggle error
  //     if (!phoneError) {
  //       dispatch(togglePhoneError());
  //     }    
  //   }
  // } 
  // Error message for first and last name field
  const NameError = () => {
    return (
      <span>
        Only letters and accented characters allowed.
      </span>
    )
  } // Error message for email field
  const EmailError = () => {
    return (
      <span>
        Please enter a valid email address.
      </span>
    )
  } // Error message for phone number field
  const PhoneError = () => {
    return (
      <span>
        Please enter a valid phone number.
      </span>
    )
  }
  const SubjectError = () => {
    return (
      <span>
        Please use 100 characters or less.
      </span>
    )
  }
  const DescriptionError = () => {
    return (
      <span>
        Please use 100 characters or less.
      </span>
    )
  }
  const SubjectCounter = () => {
    return (
      <span>{subjectCounter}/60</span>
    )
  }
  const DescriptionCounter = () => {
    return (
      <span>{descriptionCounter}/250</span>
    )
  }
  // Custom interface explicitly typing each field
  interface FormElements extends HTMLFormControlsCollection { // HTMLFormControlsCollection represents all the form controls
    firstName: HTMLInputElement;
    lastName: HTMLInputElement;
    email: HTMLInputElement;
    phone: HTMLInputElement;
    subject: HTMLInputElement;
    description: HTMLInputElement;
  } 
  // Function that handles form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget.elements as FormElements // Elements property from HTMLFormControlsCollection to access all fields 
    const firstNameValue = form.firstName.value; // Value property from HTMLInputElement
    const lastNameValue = form.lastName.value;
    const emailValue = form.email.value;
    const phoneValue = form.phone.value;
    const subjectValue = form.phone.value;
    const descriptionValue = form.phone.value;
    handleField(firstNameValue, nameRegex, firstNameError, setFirstName, toggleFirstNameError);
    handleField(lastNameValue, nameRegex, lastNameError, setLastName, toggleLastNameError);
    handleField(emailValue, emailRegex, emailError, setEmail, toggleEmailError);
    handleField(phoneValue, phoneRegex, phoneError, setPhone, togglePhoneError);
    handleField(subjectValue, subjectRegex, subjectError, setSubject, toggleSubjectError);
    handleField(descriptionValue, descriptionRegex, descriptionError, setDescription, toggleDescriptionError);
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
        />
        <SubjectCounter></SubjectCounter>
        {SubjectError ? (<SubjectError></SubjectError>) : null}
      </div>
      <div>
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          name="description"
        />
        <DescriptionCounter></DescriptionCounter>
        {DescriptionError ? (<DescriptionError></DescriptionError>) : null}
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