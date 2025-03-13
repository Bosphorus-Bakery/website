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
} from '@/lib';
import type { ContactField, ContactFields, Item } from '@/types';
import {
  nameRegex,
  emailRegex,
  phoneRegex,
  descriptionRegex,
  errorMessages,
  descriptionLimit,
  itemDetails,
} from '@/lib/constants';
import { formStyles } from '@/styles';

const ContactForm = () => {
  // Contact info form state values
  const { firstName, lastName, email, phone, subject, description } =
    useAppSelector((state) => state.contactForm.contactInfo);

  const dispatch = useAppDispatch();

  // Function validates field's input against its regex
  const validateField = (regex: RegExp, value: string) => {
    return regex.test(value) ? true : false;
  };

  // Function updates field's character counter on change
  const handleCounter = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
    fieldName: keyof ContactFields,
  ) => {
    const length = e.currentTarget.value.length;
    dispatch(setFieldCounter({ field: fieldName, value: length }));
  };

  // Function that detects value and validates it on change
  const handleOnChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
    fieldName: keyof ContactFields,
    regex: RegExp,
  ) => {
    const value = e.currentTarget.value;

    // If field is empty then update state
    if (value.trim() === '') {
      dispatch(setHasValue({ field: fieldName, value: false }));

      // If field has a value then update state
    } else {
      dispatch(setHasValue({ field: fieldName, value: true }));

      // If field value passes its regex then update state
      if (validateField(regex, value)) {
        dispatch(setIsValid({ field: fieldName, value: true }));
        dispatch(setFieldValue({ field: fieldName, value: value }));

        // If field value fails regex then update state
      } else {
        dispatch(setIsValid({ field: fieldName, value: false }));
      }
    }
  };

  // Function that reads state then displays appropriate error on blur
  const handleOnBlur = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
    fieldName: keyof ContactFields,
    field: ContactField,
  ) => {
    // If field does not have value then display required error and apply error styles
    if (!field.hasValue) {
      dispatch(
        setErrorMessage({ field: fieldName, value: errorMessages['required'] }),
      );
      e.currentTarget.classList.add(formStyles['error-border']);

      // If field has invalid value then display incorrect format error and apply error styles
    } else {
      if (!field.isValid) {
        dispatch(
          setErrorMessage({
            field: fieldName,
            value: errorMessages[fieldName],
          }),
        );
        e.currentTarget.classList.add(formStyles['error-border']);

        // If field has a valid value then clear error message and remove error styling
      } else {
        dispatch(setErrorMessage({ field: fieldName, value: '' }));
        e.currentTarget.classList.remove(formStyles['error-border']);
      }
    }
  };

  // Function submits validated form data
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const ContactFormFields = {
      firstName,
      lastName,
      email,
      phone,
      subject,
      description,
    };

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
      return (
        <button className="button" type="submit">
          Place order
        </button>
      );
    } else {
      return (
        <button className="button" type="submit">
          Submit
        </button>
      );
    }
  };

  // Function updates the subject state based on subject clicked
  const handleSubject = (
    e: React.MouseEvent<HTMLInputElement>,
    fieldName: keyof ContactFields,
  ) => {
    dispatch(setFieldValue({ field: fieldName, value: e.currentTarget.value }));
  };

  // Baklava cut type checkboxes component code
  const ItemList = () => {
    // Function runs when baklava cut type checkbox is checked or unchecked
    const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
      // Get checkbox clicked by transversing DOM
      const quantityModifier = e.currentTarget.parentElement?.parentElement
        ?.parentElement?.lastElementChild as HTMLElement;
      console.log(quantityModifier);

      // If checked show item quantity
      quantityModifier.classList.toggle(
        formStyles['quantity-container-checked'],
      );
    };

    // Update item quantity state
    const handleIncrement = (e: React.MouseEvent<HTMLButtonElement>) => {
      
      // Get item id from increment clicked
      const itemId = e.currentTarget.parentElement
        ?.getAttribute('id')
        ?.replace('QuantityControls', '');
      console.log(itemId);
    };

    return (
      // List of all baklava item checkboxes
      <ul className={formStyles['item-list']}>
        {/* Render each baklava item's details */}
        {itemDetails.map((item: Item, index: number) => (
          <li key={index} className={formStyles['item']}>
            <div className={formStyles['item-details']}>
              {/* Checkbox for baklava item */}
              <div className={formStyles['item-checkbox']}>
                <input
                  id={item.id}
                  type="checkbox"
                  value={item.id}
                  onChange={handleCheckbox}
                />
                {/* Baklava item name */}
                <label className={formStyles['label']} htmlFor="item">
                  {item.name}
                </label>
              </div>
              {/* Price of baklava item */}
              <span id="price">${item.price}</span>
            </div>
            {/* Controls to adjust quantity */}
            <div
              className={formStyles['quantity-container-unchecked']}
              id={`${item.id}QuantityControls`}
            >
              <button className={formStyles['quantity-button']}>
                <span className={formStyles['quantity-modifier-span']}>-</span>
              </button>
              <span className={formStyles['item-quantity']}>1</span>
              <button
                className={formStyles['quantity-button']}
                type="button"
                onClick={handleIncrement}
              >
                <span className={formStyles['quantity-modifier-span']}>+</span>
              </button>
            </div>
          </li>
        ))}
      </ul>
    );
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
        <div className={formStyles['all-order-fields-container']}>
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
          </div>
          {ItemList()}
          <span id="subtotal">
            Subtotal ({/* X items */}): ${/* Subtotal price */}
          </span>
        </div>
      )}
      {SubmitButton(subject)}
    </form>
  );
};

export default ContactForm;
