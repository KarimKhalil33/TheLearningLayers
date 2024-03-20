import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Login from './login';
import { MemoryRouter } from 'react-router-dom';
import { act } from '@testing-library/react';

describe('Login component', () => {
    beforeAll(() => {
        //beforeAll tests, check to see if there is any console.error message
        jest.spyOn(global.console, 'error').mockImplementation(() => { });
      });
    
      afterAll(() => {
        //restore all previous console.error after all tests
        global.console.error.mockRestore();
      });
    
    // Mocking fetch function
    const mockFetch = jest.fn();
    global.fetch = mockFetch;

    //clear every mock function before each test call
    beforeEach(() => {
        mockFetch.mockClear();
    });

    //creating a test that makes sure its submits form with valid data
    it('submits form with valid data', async () => {
        const { getByLabelText, getByText } = render(<MemoryRouter><Login /></MemoryRouter>);

        act(() => {
            //Fill out form field
            fireEvent.change(getByLabelText('Username'), { target: { value: 'testuser' } });
            fireEvent.change(getByLabelText('Password'), { target: { value: 'testpassword' } });
            fireEvent.click(getByText('Sign in'));
        })

        await waitFor(() => {
            //mock the fetch url and check that it has been called with a Post request
            expect(mockFetch).toHaveBeenCalledWith('http://localhost:4000/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: 'testuser',
                    password: 'testpassword',
                }),
            });
        });
    });

    //create a test that shows error for invalid form submission
    it('shows error on invalid form submission', async () => {
        const { getByLabelText, getByText } = render(<MemoryRouter><Login /></MemoryRouter>);

        act(() => {
            //simulate the click event
            fireEvent.click(getByText('Sign in'));
        })

        await waitFor(() => {
            //check that the right fields have been entered
            expect(getByLabelText('Username')).toHaveAttribute('required');
            expect(getByLabelText('Password')).toHaveAttribute('required');
        });
    });


      
});