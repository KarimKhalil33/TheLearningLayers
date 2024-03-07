import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import CreateAccount from './CreateAccount';

describe('CreateAccount Component', () => {
  it('renders without crashing', () => {
    render(<CreateAccount />);
  });

  it('submits the form with valid data', async () => {
    const { getByLabelText, getByRole } = render(<CreateAccount />);

    // Mock fetch function to avoid making actual network requests
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({}),
      })
    );

    // Simulate user input
    fireEvent.change(getByLabelText('Username'), { target: { value: 'testuser' } });
    fireEvent.change(getByLabelText('Email address'), { target: { value: 'test@example.com' } });
    fireEvent.change(getByLabelText('Password'), { target: { value: 'testpassword' } });
    fireEvent.change(getByLabelText('Repeat Password'), { target: { value: 'testpassword' } });

    // Submit the form
    fireEvent.click(getByRole('button', { name: /create account/i }));

    // Wait for the asynchronous fetch call
    await waitFor(() => expect(global.fetch).toHaveBeenCalled());

    // Add more assertions based on your actual implementation
    // For example, check if the routeChange function is called
    // and handle the response accordingly
  });

  // Add more test cases for different scenarios, invalid inputs, etc.
});
