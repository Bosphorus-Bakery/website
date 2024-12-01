"use client";
import type { PayloadAction } from '@reduxjs/toolkit';
import DatePicker from "react-datepicker";
import { useAppSelector, useAppDispatch, setHasValue, setFieldValue, setIsValid, setFieldCounter, setErrorMessage, setDate } from '@/lib';
import type { ContactField, ContactFields, OrderFields } from '@/types';
import { nameRegex, emailRegex, phoneRegex, descriptionRegex, errorMessages, descriptionLimit } from '@/lib/constants';
import { contactFormStyles } from '@/styles';

const ContactForm = () => {
  // Get state of contact info and order fields
  const { firstName, lastName, email, phone, subject, description } = useAppSelector((state) => state.contactForm.contactInfo);
  const { selectedDate, cart } = useAppSelector((state) => state.contactForm.order);
  const dispatch = useAppDispatch();

  const today = new Date().toISOString().split('T')[0]; // Formatted current date

  // Helper function that validates field's input against its regex
  const validateField = (regex: RegExp, value: string) => {
    return regex.test(value) ? true : false;
  }

   // Helper function that updates field's character counter on change
  const handleCounter = (e: React.ChangeEvent<HTMLTextAreaElement>, fieldName: keyof ContactFields) => {
    const length = e.currentTarget.value.length;
    dispatch(setFieldCounter({ field: fieldName, value: length }));
  }

  // const handleDateSelect = (e: React.ChangeEvent<HTMLInputElement>, fieldName: FormFieldNames) => {
  //   // Target date field value
  //   const selectedDate = e.currentTarget.value;
  //   if (selectedDate < today) {
  //     dispatch(setIsValid({ field: fieldName, value: false }));
  //   } else {
  //     dispatch(setIsValid({ field: fieldName, value: true }));
  //     dispatch(setFieldValue({ field: fieldName, value: e.currentTarget.value }));
  //   }
  // }

  // On change function that detects presence of value and validates value
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>, fieldName: keyof ContactFields, regex: RegExp
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
  const handleOnBlur = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>, fieldName: keyof ContactFields, field: ContactField) => {
    
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

  // Function accepts date object, and field name for action creator
  const handleDateSelect = (date: Date | null) => {
    if (date){
      // update date selector 
      dispatch(setDate({ value: date}));
      // format date to string to store in state as string
      
      const formattedDate = date.toISOString().split('T')[0];
      console.log(`Selected date: ${selectedDate}`);
    } else {
      console.log("date is null");
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
     }));
    console.log('handleSubmit invoked');
    console.log(fieldValues);
  }
  // TO DO: Send data to server to create email

  // Error message component that reads field's errorMessage state
  const ErrorMessage = (field: ContactField) => {
    if (field.errorMessage !== '') {
      return (
        <span>
          {field.errorMessage}
        </span>
      );
    }
  }
  // Character counter component code
  const CharacterCounter = (counter: number, characterLimit: number) => {
    return (
      <span>{counter}/{characterLimit}</span>
    );
  }

  const handleSubject = (e: React.MouseEvent<HTMLInputElement>, fieldName: keyof ContactFields)  => {
    dispatch(setFieldValue({field: fieldName, value: e.currentTarget.value}));
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
            <div>
              <label htmlFor="pickUpDate">Pick-up on:</label><DatePicker 
                id="pickUpDate"
                selected={selectedDate}
                onChange={handleDateSelect}
                dateFormat="EEEE, MMMM d, YYYY" 
              >
              </DatePicker>
            </div>
            <div>
              <label htmlFor="cutType">Type:</label>
              <select name="cutType" id="cutType">
                <option value="Twins (2 pieces)">Twins (2 pieces)</option>
                <option value="Treats (6 pieces)">Treats (6 pieces)</option>
                <option value="Family (9 pieces)">Family (9 pieces)</option>
                <option value="Feast (16 pieces)">Feast (16 pieces)</option>
                <option value="Regular Cut (90 pieces)">Regular Cut (90 pieces)</option>
                <option value="Twin Cut (48 pieces)">Twin Cut (48 pieces)</option>
                <option value="Square Cut (40 pieces)">Square Cut (40 pieces)</option>
              </select>
              <div id="quantity">
                <button>-</button>
                <span>0</span>
                </div>
                <button>+</button>
              </div>
          </div>
          
        }
      </div>
      <div>
        <button
         type="submit"> Submit 
        </button>
      </div>
    </form>
  );
}

export default ContactForm;