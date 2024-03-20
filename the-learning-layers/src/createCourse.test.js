import React from 'react';
import { render, fireEvent, waitFor, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { MemoryRouter } from 'react-router-dom';
import { act } from '@testing-library/react';
import CreateCourse from './createCourse';

describe('CreateCourse component', () => {
    afterEach(cleanup);
    it('displays invalid feedback message on empty course fields', async () => {
        // Render the component
        const { getAllByText, getByText } = render(<MemoryRouter><CreateCourse /></MemoryRouter>);



        // Perform actions such as clicking the submit button
        act(() => {
            fireEvent.submit(getAllByText('Create Course')[1]);
        });

        // Wait for the feedback to appear
        await waitFor(() => {
            // Assert that the feedback for Department is displayed
            expect(getByText('Please enter Department Name')).toBeInTheDocument();
            // Assert that the feedback for Course Number is displayed
            expect(getByText('Please enter Course Number')).toBeInTheDocument();
            // Assert that the feedback for Course Title is displayed
            expect(getByText('Please enter Course Title')).toBeInTheDocument();
        });
    });

    it('submit form with correct fields entered', async () => {
        // Mock fetch for a status that submit the correct data
        global.fetch = jest.fn().mockResolvedValue({ status: 200 });

        //Render the component
        const { getByLabelText, getAllByText } = render(<MemoryRouter><CreateCourse /></MemoryRouter>);

        await act(async () => {
            //Fill out form fields using fireEvent
            fireEvent.change(getByLabelText('Department Name'), { target: { value: 'COSC' } });
            fireEvent.change(getByLabelText('Course Number'), { target: { value: 101 } });
            fireEvent.change(getByLabelText('Teacher'), { target: { value: 'Mr. Johnson' } });
            fireEvent.change(getByLabelText('Title'), { target: { value: 'Digital Citizenship' } });
            fireEvent.change(getByLabelText('Enter Course Description'), { target: { value: 'Talks about digital citizenship' } });

            //Submit form
            fireEvent.submit(getAllByText("Create Course")[1]);
        });
        //Ensure fetch is called with correct data
        // await waitFor(() => {
        await expect(fetch).toHaveBeenCalledWith('http://localhost:4000/user/createCourse', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: 'COSC',
                courseId: '101',
                teacher: 'Mr. Johnson',
                title: 'Digital Citizenship',
                description: 'Talks about digital citizenship'
            }),
        });
        // });
    });

    it('displays invalid feedback message on partially filled form', async () => {
        // Render the component
        const { getByLabelText, getByText, getAllByText } = render(<MemoryRouter><CreateCourse /></MemoryRouter>);

        act(() => {
            // Fill out only some form fields
            fireEvent.change(getByLabelText('Department Name'), { target: { value: 'COSC' } });
            fireEvent.change(getByLabelText('Course Number'), { target: { value: '' } }); // Leave this field empty

            // Submit the form
            fireEvent.submit(getAllByText("Create Course")[1]);
        });

        // Assert that the feedback for the empty field is displayed
        await waitFor(() => {
            expect(getByText('Please enter Course Number')).toBeInTheDocument();
        });
    });

    it('displays invalid feedback message on submitting form with invalid data types', async () => {
        // Render the component
        const { getByLabelText, getByText, getAllByText } = render(<MemoryRouter><CreateCourse /></MemoryRouter>);

        act(() => {
            // Fill out form fields with invalid data types
            fireEvent.change(getByLabelText('Course Number'), { target: { value: 'ABC' } }); // Invalid data type for course number

            // Submit the form
            fireEvent.submit(getAllByText("Create Course")[1]);
        });



        // Assert that the feedback for the invalid data type is displayed
        await waitFor(() => {
            expect(getByText('Please enter Course Number')).toBeInTheDocument();
        });
    });

    
})