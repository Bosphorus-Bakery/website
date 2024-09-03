// Render as client-side component for form interact  
"use client";

import { useAppSelector, useAppDispatch, setFirstName, toggleFirstNameError, setLastName, setEmail, setPhone, setSubject, setDescription, submitForm, clearError } from '@/lib';

// TO DO: Import Regex patterns from Regex.tsx
import { nameRegex } from '@/components/Contact/Regex';


const ContactForm = () => {
  
  // useAppSelector hook to extract desired values from state object
  const { firstName, firstNameError, lastName, email, phone, subject, description, isSubmitting, error } = useAppSelector((state) => state.contactForm);

  const dispatch = useAppDispatch();

  // Validate name with Regex if valid then update state. TO DO: Troubleshoot backspaces as first char cannot be deleted.
  const updateFirstName = (e: React.FormEvent<HTMLInputElement>) => {
    const nameValue: string = e.currentTarget.value;
    if (nameRegex.test(nameValue)) {

      // Update firstName state
      dispatch(setFirstName(nameValue));
      
      // If firstName error was True, then toggle it to False because valid character was entered
      if (firstNameError) {
        dispatch(toggleFirstNameError());
      }

    // If validation fails, render error message.
    } else {

      // If firstNameError is False, then toggle it to True bc invalid character was entered
      if (!firstNameError){
        dispatch(toggleFirstNameError());
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
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

      console.log('Form Submitting:', { firstName, lastName, email, phone, subject, description, isSubmitting, error });

      // TO DO: Check all fields complete before submitting
      if (firstName || lastName || email || phone || subject || description == ""){
      
        // TO DO: Form submission failure logic
        console.log('Required fields must be filled');
      }
  }

  // Dispatches action from submitForm reducer to update the state properties
  const handleClearError = () => {
    dispatch(clearError());
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="firstName">First Name:</label>
        <input
        id="firstName"
        type="text"
        value={firstName}
        // On change dispatches an action creator to update state.firstName with User input
        onChange={updateFirstName}
        />
        {firstNameError ? (<NameError></NameError>) : null}
      </div>
      <div>
        <label htmlFor="lastName">Last Name:</label>
        <input
        id="lastName"
        type="text"
        value={lastName}
        onChange={(e) => dispatch(setLastName(e.target.value))}
        />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => dispatch(setEmail(e.target.value))} 
        />
      </div>
      <div>
        <label htmlFor="phone">Phone:</label>
        <input
          id="phone"
          type="tel"
          value={phone}
          onChange={(e) => dispatch(setPhone(e.target.value))} 
        />
      </div>
      <div>
        <label htmlFor="subject">Subject:</label>
        <input
          id="subject"
          type="text"
          value={subject}
          onChange={(e) => dispatch(setSubject(e.target.value))} 
        />
      </div>
      <div>
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => dispatch(setDescription(e.target.value))}
        />
      </div>
      <div>
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Send'} {/* Disable button and show loading text while form submitting
  */}
        </button>
      </div>
      {error &&(
        <div>
          <p className="error">{error}</p>
          <button type="button" onClick={handleClearError}>OK</button>
        </div>
      ) }
    </form>
  )
}

export default ContactForm;