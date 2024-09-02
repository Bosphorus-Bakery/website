// Render as client-side component for form interact  
"use client";

import { useAppSelector, useAppDispatch, setFirstName, setLastName, setEmail, setPhone, setSubject, setDescription, submitForm, clearError } from '@/lib';

// TO DO: Import Regex patterns from Regex.tsx
import { nameRegex } from '@/components/Contact/Regex';


const ContactForm = () => {
  
  // useAppSelector hook to extract desired values from state object
  const { firstName, lastName, email, phone, subject, description, isSubmitting, error } = useAppSelector((state) => state.contactForm);

  const dispatch = useAppDispatch();

  // Validate name with Regex and update state if valid
  const onNameChange = (e: React.FormEvent<HTMLInputElement>) => {
    const nameValue: string = e.currentTarget.value;

    if (nameRegex.test(nameValue)) {
      console.log('Valid name');
      console.log(`First name - state: ${firstName}`);
      dispatch(setFirstName(nameValue));
    } else {
      console.log('Invalid name');
    }
  }

  // TO DO: Feed email details into email to bosphorusbakery
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

      console.log('Form Submitting:', { firstName, lastName, email, phone, subject, description, isSubmitting, error });

      // TO DO: Check all fields complete before submitting
      if (firstName || lastName || email || phone || subject || description == ""){
      
        // TO DO: Error logic
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
        onChange={onNameChange}
        />
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