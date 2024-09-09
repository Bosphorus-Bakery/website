"use client";

import { useAppSelector, useAppDispatch, setFirstName, toggleFirstNameError, toggleLastNameError, setLastName, setEmail, setPhone, setSubject, setDescription, submitForm, clearError } from '@/lib';

// TO DO: Import all Regex patterns from Regex.tsx
import { nameRegex, emailRegex } from '@/components/Contact/Regex';

const ContactForm = () => {

  interface FormElements extends HTMLFormControlsCollection {
    firstNameInput: HTMLInputElement,
    lastNameInput: HTMLInputElement
  }
  
  // useAppSelector hook extracts desired values from state object
  const { firstName, firstNameError, lastName, lastNameError, email, phone, subject, description, isSubmitting, error } = useAppSelector((state) => state.contactForm);

  const dispatch = useAppDispatch();

  // Validates then updates firstName state
  const handleFirstName = (e: React.FormEvent<HTMLInputElement>) => {
    const firstNameValue: string = e.currentTarget.value;

    if (nameRegex.test(firstNameValue)) {
      dispatch(setFirstName(firstNameValue));
      
      // Toggles off error if value was valid
      if (firstNameError) {
        dispatch(toggleFirstNameError());
      }
    } else {

      // Toggles on error if value was invalid
      if (!firstNameError){
        dispatch(toggleFirstNameError());
      }    
    }
  }

const handleLastName = (e: React.FormEvent<HTMLInputElement>) => {
  const nameValue: string = e.currentTarget.value;
  if (nameRegex.test(nameValue)) {
    dispatch(setLastName(nameValue));
    if (lastNameError) {
      dispatch(toggleLastNameError());
    }
  } else {
    if (!lastNameError){
      dispatch(toggleLastNameError());
    }    
  }
}
  const NameError = () => {
    return (
      <span>
        Only letters and accented characters allowed.
      </span>
    )
  }

  // TO DO: Feed email details into email to bosphorusbakery
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Form Submitted')

      // Check all fields complete before submitting
      if (firstName || lastName || email || phone || subject || description == ""){
      
        // TO DO: Form submission failure logic
        console.log('Empty fields detected');
      }
    
      handleFirstName(e: React.FormEvent<HTMLInputElement>)

  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="firstName">First Name:</label>
        <input
        id="firstName"
        type="text"
        />
        {firstNameError ? (<NameError></NameError>) : null}
      </div>
      <div>
        <label htmlFor="lastName">Last Name:</label>
        <input
        id="lastName"
        type="text"
        />
        {lastNameError ? (<NameError></NameError>) : null}
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          type="email"
        />
      </div>
      <div>
        <label htmlFor="phone">Phone:</label>
        <input
          id="phone"
          type="tel"
        />
      </div>
      <div>
        <label htmlFor="subject">Subject:</label>
        <input
          id="subject"
          type="text"
        />
      </div>
      <div>
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
        />
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