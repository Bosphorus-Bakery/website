import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/lib'; // Import the root state type from your store
import {
  setFirstName,
  setLastName,
  setEmail,
  setPhone,
  setSubject,
  setDescription,
  submitForm,
  clearError,
} from '@/lib/features/contactFormSlice';

interface ContactFormProps {

}
// React.FC is a generic type and will accept props of ContactFormProps interface shape
const ContactForm: React.FC<ContactFormProps> = () => {
  const dispatch = useDispatch();

  // useSelector hook to take entire store state and extracts desired value
  const firstName = useSelector((state: RootState) => state.contactForm.firstName);
  const lastName = useSelector((state: RootState) => state.contactForm.lastName);
  const email = useSelector((state: RootState) => state.contactForm.email);
  const phone = useSelector((state: RootState) => state.contactForm.phone);
  const subject = useSelector((state: RootState) => state.contactForm.subject);
  const description = useSelector((state: RootState) => state.contactForm.description);
  const isSubmitting = useSelector((state: RootState) => state.contactForm.isSubmitting);
  const error = useSelector((state: RootState) => state.contactForm.error);
  
  // Dispatches action from submitForm reducer to update the state properties
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(submitForm({ firstName, lastName, email, phone, subject, description }));
  }

  // Dispatches action from submitForm reducer to update the state properties
  const handleClearError = () => {
    dispatch(clearError());
  }


  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="firstName">First Name: </label>
        <input
        id="firstName"
        type="text"
        value={firstName}
        // On change dispatches an action creator to update state.firstName with User input
        onChange={(e) => dispatch(setFirstName(e.target.value))}
        />
      </div>
      <div>
        <label htmlFor="lastName">Last Name: </label>
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
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Submitting...' : 'Send'} {/* Disable button and show loading text while form submitting
 */}
      </button>
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