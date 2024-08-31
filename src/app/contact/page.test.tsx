import React from 'react';

// Renders component to virtual DOM, Screen lets us query virtual DOM, fireEvent simulates user event 
import { render, screen, fireEvent } from '@testing-library/react';

// For components to access Redux store
import { Provider } from 'react-redux';
import configureStore, { MockStoreEnhanced } from 'redux-mock-store';
import { RootState } from '@/lib'
import ContactForm from '@/components/Contact/ContactForm';
import '@testing-library/jest-dom/extend-expect';

// Mock store to simulate Redux store
const mockStore = configureStore([]);

// Test suite for Contact Form component
describe('ContactForm Component', () => {
  let store: MockStoreEnhanced<RootState>; // Type the mock store variable

  // Reset state before each test case
  beforeEach(() => {
    const store = mockStore({
      contactForm: {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        subject: '',
        description: '',
        isSubmitting: false,
        error: null,
      },
    });
  });

  // Test rendering of contact form
  it('should render the contact form with all fields', () => {
    render(
      <Provider store={store}>
        <ContactForm />
      </Provider>
    );
    // Checks if element with "first name:" (case-insensitive) exists in DOM
    expect(screen.getByLabelText(/first name:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/last name:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/phone:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/subject:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/description:/i)).toBeInTheDocument();
  });  
});