"use client";
import type { PayloadAction } from '@reduxjs/toolkit';
import { useAppSelector, useAppDispatch, setHasValue, setFieldValue, setIsValid, setFieldCounter, setErrorMessage } from '@/lib';
import { nameRegex, emailRegex, phoneRegex, subjectRegex, descriptionRegex, 
  errorMessages,
  subjectLimit, descriptionLimit } from '@/lib/constants';
import requiredFields from '@/lib/constants/requiredFields';
import type { FieldState, ContactFormState, FormFieldName } from '@/types';
import { contactFormStyles } from '@/styles';

const ContactForm = () => {
  const { firstName, lastName, email, phone, subject, description } = useAppSelector((state) => state.contactForm); // Access the state of each field using the useAppSelector hook
  const dispatch = useAppDispatch(); // Dispatches actions with useAppDispatch hook

  const validateField = (regex: RegExp, value: string) => {
    return regex.test(value) ? true : false;
  }

  // On change function that detects presence of value and validates value
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>, fieldName: FormFieldName, regex: RegExp
  ) => {
    const value = e.currentTarget.value;

    // Check if field has a value
    if (value.trim() === '') { // If field does not have value
      dispatch(setHasValue({ field: fieldName, value: false })); // Set field's hasValue state false
    } else { // If field has a value
      dispatch(setHasValue({ field: fieldName, value: true })); // Set field's hasValue state true

      // Check if value is valid
      if (validateField(regex, value)) { // If value is valid
        dispatch(setIsValid({ field: fieldName, value: true })); // Set field's isValid state true
        dispatch(setFieldValue({ field: fieldName, value: value }))
      } else { // If value is invalid
        dispatch(setIsValid({ field: fieldName, value: false  })); // Set field's isValid state false
      } 
    }    
  };

  // On blur function that reads hasValue and isValid state and displays error
  const handleOnBlur = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>, fieldName: FormFieldName, field: FieldState) => {
    
    // Check hasValue state and whether field is required
    if (!field.hasValue && requiredFields[fieldName]) { // If hasValue state is false and field is required
      console.log(requiredFields[fieldName]);
      e.currentTarget.className = contactFormStyles.errorBorder; // Apply error styling to field
      dispatch(setErrorMessage({ field: fieldName, value: errorMessages['required'] })); // Set required error message

    } else { // If field has value
      if (!field.isValid) { // And if value is invalid
        e.currentTarget.className = contactFormStyles.errorBorder; // Apply error styling
        dispatch(setErrorMessage({ field: fieldName, value: errorMessages[fieldName] })); // Set validation error message

      } else { // If field is valid
        e.currentTarget.classList.remove(contactFormStyles.errorBorder); // Remove error styling
        dispatch(setErrorMessage({ field: fieldName, value: '' })); // Clear error message
      }
    }
  }

  // Function that updates field's character counter on change
  const handleCounter = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>, fieldName: FormFieldName) => {
    const length = e.currentTarget.value.length;
    dispatch(setFieldCounter({ field: fieldName, value: length }));
  }

  // // Custom interface to type each form field
  // interface FormElements extends HTMLFormControlsCollection { // HTMLFormControlsCollection represents all the form controls
  //   firstName: HTMLInputElement;
  //   lastName: HTMLInputElement;
  //   email: HTMLInputElement;
  //   phone: HTMLInputElement;
  //   subject: HTMLInputElement;
  //   description: HTMLTextAreaElement;
  // } 

  // Handle submit function that generates and sends email to bosphorusbakery@gmail.com
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    const contactFormState = { firstName, lastName, email, phone, subject, description };

    const fieldValues = Object.entries(contactFormState) // Transforms state object into array of [key, value] pairs
    .map(([fieldName, fieldValue]) => ({ // Iterates through [key, value] pairs and extracts the key form value
      field: fieldName,
      value: fieldValue
     }))

    console.log(fieldValues);

  }
  // TO DO: Configure SendGrid API, Shape data to fit object that SendGrid will accept and send email with

  // Error message component that reads field's errorMessage state
  const ErrorMessage = (field: FieldState) => {
    if (field.errorMessage !== '') {
      return (
        <span>
          {field.errorMessage}
        </span>
      )
    }
  }
  // Character counter component code
  const CharacterCounter = (counter: number, characterLimit: number) => {
    return (
      <span>{counter}/{characterLimit}</span>
    )
  }

  // Contact form component code
  return (
    <form onSubmit={handleSubmit} noValidate>
      <div>
        <label htmlFor="firstName">First Name:</label>
        <input
          id="firstName"
          name="firstName"
          type="text"
          onChange={(e) => {handleOnChange(e, 'firstName', nameRegex)}}
          onBlur={(e) => {handleOnBlur(e, 'firstName', firstName)}}
        />
        {ErrorMessage(firstName)}
      </div>
      <div>
        <label htmlFor="lastName">Last Name:</label>
        <input
          id="lastName"
          name="lastName"
          type="text"
          onChange={(e) => {handleOnChange(e, 'lastName', nameRegex)}}
          onBlur={(e) => {handleOnBlur(e, 'lastName', lastName)}}
        />
        {ErrorMessage(lastName)}
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          name="email"
          type="email"
          onChange={(e) => {handleOnChange(e, 'email', emailRegex)}}
          onBlur={(e) => {handleOnBlur(e, 'email', email)}}
        />
        {ErrorMessage(email)}
      </div>
      <div>
        <label htmlFor="phone">Phone:</label>
        <input
          id="phone"
          name="phone"
          type="tel"
          onChange={(e) => {handleOnChange(e, 'phone', phoneRegex)}}
          onBlur={(e) => {handleOnBlur(e, 'phone', phone)}}
        />
        {ErrorMessage(phone)}
      </div>
      <div>
        <label htmlFor="subject">Subject:</label>
        <input
          id="subject"
          name="subject"
          type="text"
          onChange={(e) => {
            handleOnChange(e, 'subject', subjectRegex)
            handleCounter(e, 'subject')
          }}
          onBlur={(e) => {handleOnBlur(e, 'subject', subject)}}
        /> {/* Counter is optional field and defaults to 0 */}
        {CharacterCounter(subject.counter ??  0, subjectLimit)}
        {ErrorMessage(subject)}
      </div>
      <div>
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          name="description"
          onChange={(e) => {
            handleOnChange(e, 'description', descriptionRegex)
            handleCounter(e, 'description')
          }}
          onBlur={(e) => {handleOnBlur(e, 'description', description)}}
        />
        {CharacterCounter(description.counter ??  0, descriptionLimit)}
        {ErrorMessage(description)}
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