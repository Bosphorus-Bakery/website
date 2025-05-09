"use client";
import type { PayloadAction } from '@reduxjs/toolkit';
import { useAppSelector, useAppDispatch, setHasValue, setFieldValue, setIsValid, setFieldCounter, setErrorMessage } from '@/lib';
import { nameRegex, emailRegex, phoneRegex, subjectRegex, descriptionRegex, 
  // nameErrorMessage, emailErrorMessage, phoneErrorMessage, subjectErrorMessage, descriptionErrorMessage, requiredErrorMessage, 
  errorMessages,
  subjectLimit, descriptionLimit } from '@/lib/constants';
import requiredFields from '@/lib/constants/requiredFields';
import type { FieldState, ContactFormState, FormFieldName } from '@/types';
import { contactFormStyles } from '@/styles';

const ContactForm = () => {
  const { firstName, lastName, email, phone, subject, description } = useAppSelector((state) => state.contactForm); // Access the state of each field using the useAppSelector hook
  const dispatch = useAppDispatch(); // Dispatches actions with useAppDispatch hook

  // Helper function that validates field's input
  const validateInput = (inputValue: string, regex: RegExp) => {
    return regex.test(inputValue) ? true : false;
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

      // Validate value with corresponding regex
      if (validateInput(value, regex)) { // If value is valid
        dispatch(setIsValid({ field: fieldName, value: true })); // Set field's isValid state true
      } else { // If value is invalid
        dispatch(setIsValid({ field: fieldName, value: false  })); // Set field's isValid state false
      } 
    }    
  };

  // On blur function that reads hasValue and isValid state and applies error feedback
  const handleOnBlur = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>, fieldName: FormFieldName, field: FieldState) => {
    
    // Check hasValue state
    if (!field.hasValue && requiredFields[fieldName]) { // If hasValue is false and field is required
      console.log(requiredFields[fieldName]);
      e.currentTarget.className = contactFormStyles.errorBorder; // Apply error styling
      dispatch(setErrorMessage({ field: fieldName, value: errorMessages['required'] })); // Set field's errorMessage state to the required error

    } else { // If field has value
      if (!field.isValid) { // And if value is invalid
        e.currentTarget.className = contactFormStyles.errorBorder; // Apply error styling
        dispatch(setErrorMessage({ field: fieldName, value: errorMessages[fieldName] })); // Set validation error message

      } else { // If field is valid
        e.currentTarget.classList.remove(contactFormStyles.errorBorder);
        dispatch(setErrorMessage({ field: fieldName, value: '' }));
      }
    }
  }

  // Form submission function that updates field's value state and sends email to User
  const handleField = (
    fieldName: FormFieldName, // Accepts field name
    inputValue: string, // Accepts current value in input field
    regex: RegExp, // Accepts a Regex pattern
    setFieldValueAction: (payload: { field: FormFieldName, value: string }) // Accepts value state action creator function
     => PayloadAction<{ field: string; value: string }>
    ) => {
      // If input matches regex pattern
      if (regex.test(inputValue)) {
        dispatch(setFieldValueAction( {field: fieldName, value: inputValue })); // Update field's state with current value    }
    };
  };

 // Function that updates field's character counter on change
 const handleCounter = (field: FormFieldName, 
  e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>
 ) => {
  const currentInputLength = e.currentTarget.value.length;
  dispatch(setFieldCounter({ field: field, value: currentInputLength }));
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

  // Handle submit function that validates input and updates state
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget.elements as FormElements // Forms constant represents all form elements
    const firstNameValue = form.firstName.value; // Get each value from all fields
    const lastNameValue = form.lastName.value;
    const emailValue = form.email.value;
    const phoneValue = form.phone.value;
    const subjectValue = form.subject.value;
    const descriptionValue = form.description.value;

    handleField('firstName', firstNameValue, nameRegex, setFieldValue);
    handleField('lastName', lastNameValue, nameRegex, setFieldValue)
    handleField('email', emailValue, emailRegex, setFieldValue)
    handleField('phone', phoneValue, phoneRegex, setFieldValue)
    handleField('subject', subjectValue, subjectRegex, setFieldValue)
    handleField('description', descriptionValue, descriptionRegex, setFieldValue)
    // TO DO: Invoke function that generates and sends email to test email 
  }

  // Error message component code

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
  // const errorMessageFunction = (field: FieldState , nameErrorMessage: string) => {
  //   if (!field.isValid) {
  //     ErrorMessage(nameErrorMessage)
  //   }
  // }


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
          onBlur={(e) => {
              handleOnBlur(e, 'firstName', firstName)
          }}
        />
        {ErrorMessage(firstName)}
        {/* {firstName.isValid ? null : ErrorMessage(nameErrorMessage)} */}
      </div>
      <div>
        <label htmlFor="lastName">Last Name:</label>
        <input
          id="lastName"
          name="lastName"
          type="text"
        />
        {/* {lastName.isValid ? null : ErrorMessage(nameErrorMessage)} */}
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          name="email"
          type="email"
          />
        {/* {email.isValid ? null : ErrorMessage(emailErrorMessage)} */}
      </div>
      <div>
        <label htmlFor="phone">Phone:</label>
        <input
          id="phone"
          name="phone"
          type="tel"
        />
        {/* {phone.isValid ? null : ErrorMessage(phoneErrorMessage)} */}
      </div>
      <div>
        <label htmlFor="subject">Subject:</label>
        <input
          id="subject"
          name="subject"
          type="text"
          onChange={(e) => {
            handleCounter(
              'subject', e)
          }}
        /> {/* Counter is optional field and defaults to 0 as fallback */}
        {CharacterCounter(subject.counter ??  0, subjectLimit)}
        {/* {subject.isValid ? null: ErrorMessage(subjectErrorMessage)} */}
      </div>
      <div>
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          name="description"
          onChange={(e) => {
            handleCounter('description', e)
          }}
        />
        {CharacterCounter(description.counter ??  0, descriptionLimit)}
        {/* {description.isValid ? null : ErrorMessage(descriptionErrorMessage)} */}
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