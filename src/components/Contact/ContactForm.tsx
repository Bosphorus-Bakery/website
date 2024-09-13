"use client";
import { useAppSelector, useAppDispatch, setFirstName, toggleFirstNameError, toggleLastNameError, setLastName, setEmail, setPhone, setSubject, setDescription, submitForm, clearError } from '@/lib';
import { nameRegex, emailRegex } from '@/components/Contact/Regex';

const ContactForm = () => {

  // Get values from state object
  const { firstName, firstNameError, lastName, lastNameError, email, phone, subject, description, isSubmitting, error } = useAppSelector((state) => state.contactForm);
  const dispatch = useAppDispatch();

  // Function that validates and updates firstName state
  const handleFirstName = (firstNameValue: string) => {
    if (nameRegex.test(firstNameValue)) { // If firstName input is valid then updates firstName state
      dispatch(setFirstName(firstNameValue)); 
      if (firstNameError) { // Toggles off firstName error
        dispatch(toggleFirstNameError()); 
      } 
    } else { // If firstName input is invalid then toggle on firstNameError 
      if (!firstNameError){
        dispatch(toggleFirstNameError());
      }    
    }
  }  // Function that validates and updates lastName state
  const handleLastName = (lastNameValue: string) => {
    if (nameRegex.test(lastNameValue)) { // If lastName input is valid then updates lastName state
      dispatch(setLastName(lastNameValue));
      if (lastNameError) { // Toggles off lastName error
        dispatch(toggleLastNameError());
      }
    } else { // If lastName input is invalid then toggle on lastNameError
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

  // Interface types the form fields using the field's name attribute
  interface FormElements extends HTMLFormControlsCollection {
    firstName: HTMLInputElement;
    lastName: HTMLInputElement;
  } 

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => { // Handles submission of all <form> relevant info
    e.preventDefault();
    const form = e.currentTarget.elements as FormElements // Type form elements with FormsElements interface
    const firstNameValue = form.firstName.value;
    const lastNameValue = form.lastName.value;
    handleFirstName(firstNameValue);
    handleLastName(lastNameValue);
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="firstName">First Name:</label>
        <input
        id="firstName"
        name="firstName"
        type="text"
        />
        {firstNameError ? (<NameError></NameError>) : null}
      </div>
      <div>
        <label htmlFor="lastName">Last Name:</label>
        <input
        id="lastName"
        name="lastName"
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