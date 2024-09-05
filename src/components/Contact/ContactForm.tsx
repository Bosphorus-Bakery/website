// Render as client-side component for form interact  
"use client";

// Import hooks and actions 
import { useAppSelector, useAppDispatch, setFirstName, toggleFirstNameError, toggleLastNameError, setLastName, setEmail, setPhone, setSubject, setDescription, submitForm, clearError } from '@/lib';

// TO DO: Import all Regex patterns from Regex.tsx
import { nameRegex } from '@/components/Contact/Regex';

const ContactForm = () => {
  
  // useAppSelector hook extracts desired values from state object
  const { firstName, firstNameError, lastName, lastNameError, email, phone, subject, description, isSubmitting, error } = useAppSelector((state) => state.contactForm);

  // useAppDispatch hook dispatches actions defined in slice
  const dispatch = useAppDispatch();

  // Validates then updates input in firstName field
  const handleFirstName = (e: React.FormEvent<HTMLInputElement>) => {
    const firstNameValue: string = e.currentTarget.value;

    // Update state if valid input
    if (nameRegex.test(firstNameValue)) {
      dispatch(setFirstName(firstNameValue));
      
      // If error state was true then toggle off
      if (firstNameError) {
        dispatch(toggleFirstNameError());
      }
    // Do not update state if invalid input
    } else {

      // If error state was false then toggle on
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
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

      console.log('Form Submitting:', { firstName, lastName, email, phone, subject, description, isSubmitting, error });

      // TO DO: Check all fields complete before submitting
      if (firstName || lastName || email || phone || subject || description == ""){
      
        // TO DO: Form submission failure logic
        console.log('Required fields must be filled');
      }
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
        onChange={handleFirstName}
        />
        {firstNameError ? (<NameError></NameError>) : null}
      </div>
      <div>
        <label htmlFor="lastName">Last Name:</label>
        <input
        id="lastName"
        type="text"
        value={lastName}
        onChange={handleLastName}
        />
        {lastNameError ? (<NameError></NameError>) : null}
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
    </form>
  )
}

export default ContactForm;