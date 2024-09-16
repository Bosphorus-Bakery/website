"use client";
import { useAppSelector, useAppDispatch, setFirstName, toggleFirstNameError, setLastName, toggleLastNameError, setEmail, toggleEmailError, setPhone, togglePhoneError, setSubject, setDescription, submitForm, clearError } from '@/lib';
import { nameRegex, emailRegex, phoneRegex } from '@/components/Contact/Regex';

const ContactForm = () => {

  // Get values from state object
  const { firstName, firstNameError, lastName, lastNameError, email, emailError, phone, phoneError, subject, description, isSubmitting, error } = useAppSelector((state) => state.contactForm);
  const dispatch = useAppDispatch();

  // Function that validates and updates firstName state
  const handleFirstName = (firstNameValue: string) => {
    if (nameRegex.test(firstNameValue)) { // If firstName input is valid then updates firstName state
      dispatch(setFirstName(firstNameValue)); 
      if (firstNameError) { // Toggles off firstName error
        dispatch(toggleFirstNameError()); 
      } 
    } else { // If firstName input is invalid then toggle on firstNameError 
      if (!firstNameError) {
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
      if (!lastNameError) {
        dispatch(toggleLastNameError());
      }    
    }
  } // Function that validates and updates email state
  const handleEmail = (emailValue: string) => {
    if (emailRegex.test(emailValue)) {
      dispatch(setEmail(emailValue));
      if (emailError) {
        dispatch(toggleEmailError());
      }
    } else { // If email input is invalid then toggle error
      if (!emailError) {
        dispatch(toggleEmailError());
      }    
    }
  }

  // Function that validates and updates phone state
  const handlePhone = (phoneValue: string) => {
    if (phoneRegex.test(phoneValue)) {
      dispatch(setPhone(phoneValue));
      if (phoneError) {
        dispatch(togglePhoneError());
      }
    } else { // If phone input is invalid then toggle error
      if (!phoneError) {
        dispatch(togglePhoneError());
      }    
    }
  } // Error message for first and last name field
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
  } // Error mesage for phone number field
  const PhoneError = () => {
    return (
      <span>
        Please enter a valid phone number.
      </span>
    )
  }

  // Interface types the form fields using the field's name attribute
  interface FormElements extends HTMLFormControlsCollection {
    firstName: HTMLInputElement;
    lastName: HTMLInputElement;
    email: HTMLInputElement;
    phone: HTMLInputElement;
  } 
  // Function that handles submission of form input
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget.elements as FormElements // Type form elements with FormsElements interface
    const firstNameValue = form.firstName.value;
    const lastNameValue = form.lastName.value;
    const emailValue = form.email.value;
    const phoneValue = form.phone.value;
    handleFirstName(firstNameValue);
    handleLastName(lastNameValue);
    handleEmail(emailValue);
    handlePhone(phoneValue);
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div>
        <label htmlFor="firstName">First Name:</label>
        <input
          id="firstName"
          name="firstName"
          type="text"
        /> {/* Conditionally render error message */}
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
          name="email"
          type="email"
          />
        {emailError ? (<EmailError></EmailError>) : null}
      </div>
      <div>
        <label htmlFor="phone">Phone:</label>
        <input
          id="phone"
          name="phone"
          type="tel"
        />
        {phoneError ? (<PhoneError></PhoneError>) : null}
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