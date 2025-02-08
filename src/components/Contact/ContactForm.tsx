'use client';
import type { PayloadAction } from '@reduxjs/toolkit';
import DatePicker from 'react-datepicker';
import {
  useAppSelector,
  useAppDispatch,
  setHasValue,
  setFieldValue,
  setIsValid,
  setFieldCounter,
  setErrorMessage,
  setDate,
} from '@/lib';
import type { ContactField, ContactFields, OrderFields } from '@/types';
import {
  nameRegex,
  emailRegex,
  phoneRegex,
  descriptionRegex,
  errorMessages,
  descriptionLimit,
} from '@/lib/constants';
import { formStyles } from '@/styles';

const ContactForm = () => {
  // To access Contact Form state
  const { firstName, lastName, email, phone, subject, description } =
    useAppSelector((state) => state.contactForm.contactInfo); // Contact info state properties
  const { selectedDate, cart } = useAppSelector(
    (state) => state.contactForm.order,
  ); // Order state properties
  const dispatch = useAppDispatch();

  // Helper function that validates field's input against its regex
  const validateField = (regex: RegExp, value: string) => {
    return regex.test(value) ? true : false;
  };

  // Helper function that updates field's character counter on change
  const handleCounter = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
    fieldName: keyof ContactFields,
  ) => {
    const length = e.currentTarget.value.length;
    dispatch(setFieldCounter({ field: fieldName, value: length }));
  };

  // On change function that detects presence of value and validates value
  const handleOnChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>, // Accepts both text areas and input fields
    fieldName: keyof ContactFields, // Only field names
    regex: RegExp,
  ) => {
    // Get value in field
    const value = e.currentTarget.value;

    // If field is empty
    if (value.trim() === '') {
      dispatch(setHasValue({ field: fieldName, value: false }));

      // If field has a value
    } else {
      dispatch(setHasValue({ field: fieldName, value: true }));

      // If field value passes its regex
      if (validateField(regex, value)) {
        dispatch(setIsValid({ field: fieldName, value: true }));
        dispatch(setFieldValue({ field: fieldName, value: value }));

        // If field value fails regex
      } else {
        dispatch(setIsValid({ field: fieldName, value: false }));
      }
    }
  };

  // On blur function that reads state then displays appropriate error
  const handleOnBlur = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
    fieldName: keyof ContactFields,
    field: ContactField,
  ) => {
    // If field does not have value
    if (!field.hasValue) {
      dispatch(
        // Display required field error message
        setErrorMessage({ field: fieldName, value: errorMessages['required'] }),
      ); // Add required error message
      e.currentTarget.classList.add(formStyles['error-border']); // Add error styling

      // If field has invalid value
    } else {
      if (!field.isValid) {
        dispatch(
          // Display invalid value error message
          setErrorMessage({
            field: fieldName,
            value: errorMessages[fieldName],
          }),
        ); // Add error styling
        e.currentTarget.classList.add(formStyles['error-border']);

        // If field has a valid value
      } else {
        dispatch(setErrorMessage({ field: fieldName, value: '' })); // Clear error message
        e.currentTarget.classList.remove(formStyles['error-border']); // Add error styling
      }
    }
  };

  // Function accepts date object, and field name for action creator
  const handleDateSelect = (date: Date | null) => {
    // Q: Why can date be null?
    if (date) {
      dispatch(setDate({ value: date })); // Update date state
      const formattedDate = date.toISOString().split('T')[0];
      console.log(`Selected date: ${selectedDate}`);
    } else {
      console.log('date is null');
    }
  };

  // Function submits validated form data
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); //
    const ContactFormFields = {
      firstName,
      lastName,
      email,
      phone,
      subject,
      description,
    };

    //
    const fieldValues = Object.entries(ContactFormFields) // Transforms state object into array of key value pairs
      .map(([fieldName, fieldValue]) => ({
        // Iterates through key value pairs and extracts the field name and field value
        field: fieldName,
        value: fieldValue,
      }));
    console.log('handleSubmit called');
    console.log(`fieldValues: ${fieldValues}`);
  };
  // TO DO: Send data to server to create email

  // Error message component code
  const ErrorMessage = (field: ContactField) => {
    // If field's error message state contains error
    if (field.errorMessage !== '') {
      return <span className={formStyles['error']}>{field.errorMessage} </span>;
    }
  };
  // Character counter component code
  const CharacterCounter = (counter: number, characterLimit: number) => {
    return (
      <span>
        {counter}/{characterLimit}
      </span>
    );
  };
  // Submit button component code
  const SubmitButton = (subject: ContactField) => {
    // Renders "Submit" or "Order" based on subject state
    if (subject.value === 'order') {
      return <button className="button">Place order</button>;
    } else {
      return <button className="button">Submit</button>;
    }
  };

  // Function updates the subject state based on subject clicked
  const handleSubject = (
    e: React.MouseEvent<HTMLInputElement>,
    fieldName: keyof ContactFields,
  ) => {
    dispatch(setFieldValue({ field: fieldName, value: e.currentTarget.value }));
  };

  // Contact form component code
  return (
    <form
      className={formStyles['form-container']}
      onSubmit={handleSubmit}
      noValidate
    >
      {/* noValidate disables native form validation */}
      <div className={formStyles['radio-group']}>
        <input
          className={formStyles['radio-button']}
          type="radio"
          id="general"
          name="request_type"
          value="general"
          onClick={(e) => handleSubject(e, 'subject')}
        />
        <label className={formStyles['radio-label']} htmlFor="subject">
          General
        </label>
        <input
          className={formStyles['radio-button']}
          type="radio"
          id="order"
          name="request_type"
          value="order"
          onClick={(e) => handleSubject(e, 'subject')}
        />
        <label className={formStyles['radio-label']} htmlFor="order">
          Order (Pick Up)
        </label>
      </div>
      <div className={formStyles['field-container']}>
        <label className={formStyles['label']} htmlFor="firstName">
          First Name:
        </label>
        <input
          className={formStyles['field']}
          id="firstName"
          name="firstName"
          type="text"
          onChange={(e) => {
            handleOnChange(e, 'firstName', nameRegex);
          }}
          onBlur={(e) => {
            handleOnBlur(e, 'firstName', firstName);
          }}
        />
        {ErrorMessage(firstName)}
      </div>
      <div className={formStyles['field-container']}>
        <label className={formStyles['label']} htmlFor="lastName">
          Last Name:
        </label>
        <input
          className={formStyles['field']}
          id="lastName"
          name="lastName"
          type="text"
          onChange={(e) => {
            handleOnChange(e, 'lastName', nameRegex);
          }}
          onBlur={(e) => {
            handleOnBlur(e, 'lastName', lastName);
          }}
        />
        {ErrorMessage(lastName)}
      </div>
      <div className={formStyles['field-container']}>
        <label className={formStyles['label']} htmlFor="email">
          Email:
        </label>
        <input
          className={formStyles['field']}
          id="email"
          name="email"
          type="email"
          onChange={(e) => {
            handleOnChange(e, 'email', emailRegex);
          }}
          onBlur={(e) => {
            handleOnBlur(e, 'email', email);
          }}
        />
        {ErrorMessage(email)}
      </div>
      <div className={formStyles['field-container']}>
        <label className={formStyles['label']} htmlFor="phone">
          Phone:
        </label>
        <input
          className={formStyles['field']}
          id="phone"
          name="phone"
          type="tel"
          onChange={(e) => {
            handleOnChange(e, 'phone', phoneRegex);
          }}
          onBlur={(e) => {
            handleOnBlur(e, 'phone', phone);
          }}
        />
        {ErrorMessage(phone)}
      </div>
      {/* If user selects "General" subject */}
      {subject.value == 'general' && (
        <div className={formStyles['field-container']}>
          <label className={formStyles['label']} htmlFor="description">
            Description:
          </label>
          <textarea
            className={formStyles['field']}
            id="description"
            name="description"
            placeholder="Tell us how we can help"
            onChange={(e) => {
              handleOnChange(e, 'description', descriptionRegex);
              handleCounter(e, 'description');
            }}
            onBlur={(e) => {
              handleOnBlur(e, 'description', description);
            }}
          />
          {CharacterCounter(description.counter ?? 0, descriptionLimit)}
          {ErrorMessage(description)}
        </div>
      )}
      {/* If user selects "Order" subject */}
      {subject.value == 'order' && (
        <div className={formStyles['order-fields']}>
          <div className={formStyles['order-field-container']}>
            <label className={formStyles['label']} htmlFor="location">
              Location:
            </label>
            <select
              className={formStyles['field']}
              name="location"
              id="location"
            >
              <option className={formStyles['option']} value="rohnertPark">
                1301 Maurice Ave, Cotati, CA 94928
              </option>
            </select>
          </div>
          <div className={formStyles['order-field-container']}>
            <label className={formStyles['label']} htmlFor="pickUpDate">
              Pick-up on:
            </label>
            <DatePicker
              className={formStyles['field']}
              id="pickUpDate"
              selected={selectedDate}
              onChange={handleDateSelect}
              dateFormat="EEEE, MMMM d, YYYY"
            ></DatePicker>
          </div>
          <div className={formStyles['order-field-container']}>
            <label className={formStyles['label']} htmlFor="cutType">
              Type:
            </label>
            <div className={formStyles['two-col-container']}>
              <select
                className={formStyles['two-col-field']}
                name="cutType"
                id="cut-type"
              >
                <option value="Twins (2 pieces)">Twins (2 pieces)</option>
                <option value="Treats (6 pieces)">Treats (6 pieces)</option>
                <option value="Family (9 pieces)">Family (9 pieces)</option>
                <option value="Feast (16 pieces)">Feast (16 pieces)</option>
                <option value="Regular Cut (90 pieces)">
                  Regular Cut (90 pieces)
                </option>
                <option value="Twin Cut (48 pieces)">
                  Twin Cut (48 pieces)
                </option>
                <option value="Square Cut (40 pieces)">
                  Square Cut (40 pieces)
                </option>
              </select>
              <div
                className={`${formStyles['quantity-container']} ${formStyles['two-col-field']}`}
                id="actionLinks"
              >
                <div id="quantity">
                  <button id="decrement">-</button>
                  <span>1</span>
                </div>
                <button id="increment">+</button>
              </div>
            </div>
          </div>
          <div id="price">
            <label className={formStyles['label']} htmlFor="price">
              Price
            </label>
            <input type="number">{/* Baklava prices from /constants */}</input>
          </div>
          <h3 id="subtotal">
            Subtotal ({/* X items */}): ${/* Subtotal price */}
          </h3>
        </div>
      )}
      {SubmitButton(subject)}
    </form>
  );
};

export default ContactForm;
