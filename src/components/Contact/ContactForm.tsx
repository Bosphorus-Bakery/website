"use client";
import type { PayloadAction } from '@reduxjs/toolkit';
import { useAppSelector, useAppDispatch, setHasValue, setFieldValue, setIsValid, setFieldCounter, setErrorMessage } from '@/lib';
import { nameRegex, emailRegex, phoneRegex, descriptionRegex, errorMessages, descriptionLimit } from '@/lib/constants';
import type { FieldState, FormFields, FormFieldNames } from '@/types';
import { contactFormStyles } from '@/styles';

const ContactForm = () => {
  // Access the state of each field using the useAppSelector hook
  const { firstName, lastName, email, phone, subject, description, selectedDate } = useAppSelector((state) => state.contactForm);
  const dispatch = useAppDispatch(); // Dispatches actions with useAppDispatch hook

  // Helper function that validates field's input against its regex
  const validateField = (regex: RegExp, value: string) => {
    return regex.test(value) ? true : false;
  }

   // Helper function that updates field's character counter on change
  const handleCounter = (e: React.ChangeEvent<HTMLTextAreaElement>, fieldName: FormFieldNames) => {
    const length = e.currentTarget.value.length;
    dispatch(setFieldCounter({ field: fieldName, value: length }));
  }

  const handleDateSelect = (e: React.ChangeEvent<HTMLInputElement>, fieldName: FormFieldNames) => {
    // Update field's value
    const selectedDate = e.currentTarget.value
    const today = new Date().toISOString().split('T')[0];
    if (selectedDate < today) {
      dispatch(setIsValid({ field: fieldName, value: false }))
    }
    dispatch(setFieldValue({ field: fieldName, value: e.currentTarget.value }))
  }

  // On change function that detects presence of value and validates value
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>, fieldName: FormFieldNames, regex: RegExp
  ) => {
    const value = e.currentTarget.value;

    if (value.trim() === '') { // If field does not have value
      dispatch(setHasValue({ field: fieldName, value: false })); // Set hasValue state false
    } else { // If field has a value
      dispatch(setHasValue({ field: fieldName, value: true })); // Set hasValue state true

      if (validateField(regex, value)) { // If value is valid
        dispatch(setIsValid({ field: fieldName, value: true })); // Set field's isValid state true
        dispatch(setFieldValue({ field: fieldName, value: value }))
      } else { // If value is invalid
        dispatch(setIsValid({ field: fieldName, value: false  })); // Set field's isValid state false
      } 
    }    
  };

  // On blur function that displays error
  const handleOnBlur = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>, fieldName: FormFieldNames, field: FieldState) => {
    
    // Check if field has a value
    if (!field.hasValue) { // If no value
      dispatch(setErrorMessage({ field: fieldName, value: errorMessages['required'] })); // Set required error message
      e.currentTarget.className = contactFormStyles.errorBorder; // Apply error styling to field

    } else { // If field has value
      if (!field.isValid) { // And if value is invalid
        e.currentTarget.className = contactFormStyles.errorBorder; // Apply error styling
        dispatch(setErrorMessage({ field: fieldName, value: errorMessages[fieldName] })); // Set validation error message

      } else { // If field is valid
        dispatch(setErrorMessage({ field: fieldName, value: '' })); // Clear error message
        e.currentTarget.classList.remove(contactFormStyles.errorBorder); // Remove error styling
      }
    }
  }

  // Function that gets all form state values and sends email to bakery
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const ContactFormFields = { firstName, lastName, email, phone, subject, description };

    const fieldValues = Object.entries(ContactFormFields) // Transforms state object into array of key value pairs
    .map(([fieldName, fieldValue]) => ({ // Iterates through [key, value] pairs and extracts the field name and field value
      field: fieldName,
      value: fieldValue
     }))
    console.log(fieldValues);
  }
  // TO DO: Send data to server to create email

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

  const handleSubject = (e: React.MouseEvent<HTMLInputElement>, fieldName: FormFieldNames)  => {
    dispatch(setFieldValue({field: fieldName, value: e.currentTarget.value}))
  }

  // Contact form component code
  return (
    <form onSubmit={handleSubmit} noValidate>
      <div>
        <input type="radio" id="general" name="request_type" value="general" onClick={(e) => handleSubject(e, 'subject')}/>
        <label htmlFor="subject">General</label>
        <input type="radio" id="order" name="request_type" value="order" onClick={(e) => handleSubject(e, 'subject')}/>
        <label htmlFor="order">Order (Pick Up)</label>
      </div>
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
        />        {ErrorMessage(email)}
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
      {/* Conditionally render description for General Subject */}
      <div>
        {subject.value == "general" && 
          <div>
            <label htmlFor="description">Description:</label>
            <textarea id="description" name="description" placeholder='Tell us how we can help'
              onChange={(e) => {
                handleOnChange(e, 'description', descriptionRegex)
                handleCounter(e, 'description')}}
              onBlur={(e) => {handleOnBlur(e, 'description', description)}}/>
            {CharacterCounter(description.counter ??  0, descriptionLimit)}
            {ErrorMessage(description)}
          </div>
        }
        {subject.value == "order" &&
          <div>
            <p><em>* Contact provided above will be used for order contact * </em></p>
            <label htmlFor="location">Location:</label>
            <select name="location" id="location">
              <option value="rohnertPark">1301 Maurice Ave, Cotati, CA 94928</option>
            </select>
            <label htmlFor="selectedDate">Pick up on:</label>
            <input type="date" name="selectedDate" id="selectedDate" value={selectedDate.value}
              onChange={(e) => {handleDateSelect(e, 'selectedDate')}}>
            </input>
          </div>
        }
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