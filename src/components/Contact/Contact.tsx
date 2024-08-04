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
  
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(submitForm({ firstName, lastName, email, phone, subject, description }));
  }



  return (
    <form>
      <div>

      </div>
    </form>
  )
}


export default ContactForm;