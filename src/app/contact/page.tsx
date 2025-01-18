import React from 'react';
import ContactForm from '@/components/Contact/ContactForm';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us',
};

const ContactPage = () => {
  return (
    <div>
      <h1 className='form-headings'>Contact Us</h1>
      <p className='form-subheadings'>Please fill out the form below to reach out to us</p>
      <ContactForm />
    </div>
  )
}

export default ContactPage
