import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import TeacherAssignments from './teacherAssignments';
import { MemoryRouter } from 'react-router-dom';

describe('TeacherAssignments component', () => {
    test('renders create assignment modal when create button is clicked', () => {
      const { getByRole, getByLabelText } = render(
        <MemoryRouter>
          <TeacherAssignments />
        </MemoryRouter>
      );
      const createButton = getByRole('button', { name: /create assignment/i });
      fireEvent.click(createButton);
      expect(getByLabelText('Assignment Name')).toBeInTheDocument();
    });
  
    test('submits assignment form with valid data', async () => {
        const mockFetch = jest.fn(() => Promise.resolve({ status: 200 }));
        global.fetch = mockFetch;
      
        const { getByLabelText, getAllByRole } = render(
          <MemoryRouter>
            <TeacherAssignments />
          </MemoryRouter>
        );
        const createButton = getAllByRole('button', { name: /create assignment/i })[0];
        fireEvent.click(createButton);
      
        fireEvent.change(getByLabelText('Assignment Name'), { target: { value: 'Test Assignment' } });
        fireEvent.change(getByLabelText('Enter Assignment Description'), { target: { value: 'Test Description' } });
        fireEvent.change(getByLabelText('Weight'), { target: { value: '50' } });
        fireEvent.change(getByLabelText('Start Date'), { target: { value: '2024-04-12' } });
        fireEvent.change(getByLabelText('End Date'), { target: { value: '2024-04-19' } });
      
        const createAssignmentButton = getAllByRole('button', { name: /create assignment/i})[1]; // assuming the button in the modal is initially hidden
        fireEvent.click(createAssignmentButton);
      
        await waitFor(() => {
          expect(mockFetch).toHaveBeenCalled();
        });
      });      
  
      
});
