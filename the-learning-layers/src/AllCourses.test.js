import React from 'react';
import { render, fireEvent, waitFor, screen, getByRole } from '@testing-library/react';
import AllCourses from './AllCourses';
import { MemoryRouter } from 'react-router-dom';
import { act } from '@testing-library/react';

describe('AllCourses component', () => {
    beforeEach(() => {
        sessionStorage.setItem('authenticationId', JSON.stringify('test_username'));
        // Mock response data for fetch call
        const mockCourses = [
            { name: 'COSC', courseId: 101, title: 'Introduction to Computer Science' },
            { name: 'MATH', courseId: 201, title: 'Calculus I' }
        ];
        global.fetch = jest.fn().mockResolvedValue({
            ok: true,
            json: () => Promise.resolve(mockCourses)
        });
    });

    afterEach(() => {
        jest.clearAllMocks(); // Clear mock implementation after each test
    });

    it('renders the component', async () => {
        const { getByText } = render(
            <MemoryRouter>
                <AllCourses />
            </MemoryRouter>
        );
        //expect these text be in the website on page load
        expect(getByText('WELCOME TO LEARNING LAYERS')).toBeInTheDocument();
        expect(getByText('A better way to learn, anywhere and anytime.')).toBeInTheDocument();

        await waitFor(() => {
            expect(global.fetch).toHaveBeenCalledTimes(1);
        });
    });

    it('fetches courses on mount', async () => {
        const { getByText } = render(
            <MemoryRouter>
                <AllCourses />
            </MemoryRouter>
        );

        // Expect fetch to be called with the correct URL
        expect(global.fetch).toHaveBeenCalledWith('http://localhost:4000/api/enrollmentRoute/available', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: 'test_username' // Assuming a test username
            })
        });

        // Wait for the fetch to complete and then assert the presence of text
        await waitFor(() => {
            expect(getByText('COSC 101')).toBeInTheDocument();
            expect(getByText('MATH 201')).toBeInTheDocument();
        });
    });

    it('handles enrollment when button is clicked', async () => {
        const { getAllByRole } = render(
            <MemoryRouter>
                <AllCourses />
            </MemoryRouter>
        );

        // Wait for the component to render and for the fetch to complete
        expect(global.fetch).toHaveBeenCalledWith('http://localhost:4000/api/enrollmentRoute/available', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: 'test_username' // Assuming a test username
            })
        });

        // Find the button based on the dynamically generated text
        await waitFor(() => {
            const requestButton = getAllByRole('button', { name: /request to enroll/i })[0];
            // Mock user interaction: click on the enrollment button
            fireEvent.click(requestButton);
        });


        // Expect fetch to be called with the correct enrollment request data
        await waitFor(() => {

            expect(global.fetch).toHaveBeenCalledWith('http://localhost:4000/api/enrollmentRoute/pending', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: 'test_username', // Assuming a test username
                    courseName: 'COSC', // Example course name
                    courseId: 101, // Example course ID
                    title: 'Introduction to Computer Science' // Example course title
                }),
            });
        });
    });


});
