import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom'; // Import MemoryRouter
import '@testing-library/jest-dom/extend-expect';
import CreateAccount from './createAccount';
import { act } from '@testing-library/react';

describe('CreateAccount component', () => {
  it('submits form with valid data', async () => {
    // Mock fetch for a status that submit the correct data
    global.fetch = jest.fn().mockResolvedValue({ status: 200 });

    const { getByLabelText, getByText } = render(
      <MemoryRouter> {/* Wrap component in MemoryRouter */}
        <CreateAccount />
      </MemoryRouter>
    );

    act(() => {
      // Fill out form fields by using fireEvent
      fireEvent.change(getByLabelText('First Name'), { target: { value: 'John' } });
      fireEvent.change(getByLabelText('Last Name'), { target: { value: 'Doe' } });
      fireEvent.change(getByLabelText('ID Number'), { target: { value: '12345' } });
      fireEvent.change(getByLabelText('Position Type'), { target: { value: 'Student' } });
      fireEvent.change(getByLabelText('Username'), { target: { value: 'johndoe' } });
      fireEvent.change(getByLabelText('Email address'), { target: { value: 'john@example.com' } });
      fireEvent.change(getByLabelText('Password'), { target: { value: 'password' } });
      fireEvent.change(getByLabelText('Repeat Password'), { target: { value: 'password' } });

      // Submit form; this create a simulation for when someone clicks a button
      fireEvent.click(getByText('Create account'));
    });

    // Ensure fetch is called with correct data
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith('http://localhost:4000/user/createAccount', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: 'John',
          lastName: 'Doe',
          studentNum: '12345',
          position: 'Student',
          username: 'johndoe',
          email: 'john@example.com',
          password: 'password',
        }),
      });
    });
  });

  it('displays error message on failed submission', async () => {
    // Mock fetch for when there is an error creating the user; check if it works for this case
    global.fetch = jest.fn().mockResolvedValue({ status: 400, json: () => Promise.resolve({ status: 'FAILED', message: 'Failed to create user' }) });

    const { getByLabelText, getByText, findByText } = render(
      <MemoryRouter> {/* Wrap component in MemoryRouter */}
        <CreateAccount />
      </MemoryRouter>
    );
    act(() => {
      // Fill out form fields
      fireEvent.change(getByLabelText('First Name'), { target: { value: 'John' } });
      fireEvent.change(getByLabelText('Last Name'), { target: { value: 'Doe' } });
      fireEvent.change(getByLabelText('ID Number'), { target: { value: '12345' } });
      fireEvent.change(getByLabelText('Position Type'), { target: { value: 'Student' } });
      fireEvent.change(getByLabelText('Username'), { target: { value: 'johndoe' } });
      fireEvent.change(getByLabelText('Email address'), { target: { value: 'john' } });
      fireEvent.change(getByLabelText('Password'), { target: { value: 'password' } });
      fireEvent.change(getByLabelText('Repeat Password'), { target: { value: 'password' } });


      // Submit form
      fireEvent.click(getByText('Create account'));
    });

  });

  it('sets validated state to true when form is submitted with valid data', async () => {
    const { getByLabelText, getByText } = render(
      <MemoryRouter>
        <CreateAccount />
      </MemoryRouter>
    );

    // Fill out form fields
    act(() => {
      fireEvent.change(getByLabelText('First Name'), { target: { value: 'John' } });
      fireEvent.change(getByLabelText('Last Name'), { target: { value: 'Doe' } });
      fireEvent.change(getByLabelText('ID Number'), { target: { value: '12345' } });
      fireEvent.change(getByLabelText('Position Type'), { target: { value: 'Student' } });
      fireEvent.change(getByLabelText('Username'), { target: { value: 'johndoe' } });
      fireEvent.change(getByLabelText('Email address'), { target: { value: 'john@example.com' } });
      fireEvent.change(getByLabelText('Password'), { target: { value: 'password' } });
      fireEvent.change(getByLabelText('Repeat Password'), { target: { value: 'password' } });

      // Submit form
      fireEvent.click(getByText('Create account'));
    });

    // Wait for the asynchronous operation to complete
    await waitFor(() => {
      // Check if the validated state is set to true
      expect(getByLabelText('First Name').form.checkValidity()).toBe(true);
      expect(getByLabelText('Last Name').form.checkValidity()).toBe(true);
      expect(getByLabelText('ID Number').form.checkValidity()).toBe(true);
      expect(getByLabelText('Position Type').form.checkValidity()).toBe(true);
      expect(getByLabelText('Username').form.checkValidity()).toBe(true);
      expect(getByLabelText('Email address').form.checkValidity()).toBe(true);
      expect(getByLabelText('Password').form.checkValidity()).toBe(true);
      expect(getByLabelText('Repeat Password').form.checkValidity()).toBe(true);
    });
  });

//   it('logs error message on failed submission', async () => {
//     // Mock fetch for when there is an error creating the user
//     global.fetch = jest.fn().mockRejectedValue(new Error('Failed to create user'));


//     // Spy on console.error
//     const consoleErrorSpy = jest.spyOn(console, 'error');

//     const { getByLabelText, getByText } = render(
//       <MemoryRouter>
//         <CreateAccount />
//       </MemoryRouter>
//     );
//     await act(async () => {
//       // Fill out form fields
//       fireEvent.change(getByLabelText('First Name'), { target: { value: 'John' } });
//       fireEvent.change(getByLabelText('Last Name'), { target: { value: 'Doe' } });
//       fireEvent.change(getByLabelText('ID Number'), { target: { value: '12345' } });
//       fireEvent.change(getByLabelText('Position Type'), { target: { value: 'Student' } });
//       fireEvent.change(getByLabelText('Username'), { target: { value: 'johndoe' } });
//       fireEvent.change(getByLabelText('Email address'), { target: { value: 'john' } });
//       fireEvent.change(getByLabelText('Password'), { target: { value: 'password' } });
//       fireEvent.change(getByLabelText('Repeat Password'), { target: { value: 'password' } });

//       // Submit form
//       fireEvent.click(getByText('Create account'));
//     });

//     // Wait for the asynchronous operation to complete
//     await waitFor(() => {
//       // Check if console.error is called with the correct message
//       expect(consoleErrorSpy).toHaveBeenCalledWith('Error creating user:', 'Failed to create user');
//     });

//     // Restore console.error
//     consoleErrorSpy.mockRestore();
// });


});
