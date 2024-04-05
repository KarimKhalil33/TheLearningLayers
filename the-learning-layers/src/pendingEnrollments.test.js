import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import PendingEnrollments from './pendingEnrollments';
import { MemoryRouter } from 'react-router-dom';

describe('PendingEnrollments component', () => {
  beforeEach(() => {
    // Mock the fetch function to return mock data
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve([
            { studentNum: 1, studentfisrtName: 'John', studentlastName: 'Doe', title: 'Introduction to Programming' },
            { studentNum: 2, studentfisrtName: 'Jane', studentlastName: 'Smith', title: 'Advanced Mathematics' },
          ]),
      })
    );
  });

  it('renders the component with enrollments', async () => {
    const { getByText } = render(<MemoryRouter><PendingEnrollments /></MemoryRouter>);

    // Wait for the component to fetch data and render
    await waitFor(() => {
      expect(getByText('John Doe')).toBeInTheDocument();
      expect(getByText('Jane Smith')).toBeInTheDocument();
    });
  });

  it('calls acceptEnrollment when accept button is clicked', async () => {
    const { getAllByText, queryByText } = render(<MemoryRouter><PendingEnrollments /></MemoryRouter>);

    // Wait for the component to fetch data and render
    await waitFor(() => {
      const acceptButton = getAllByText('Accept')[0];
      fireEvent.click(acceptButton);
    });

    // Assert that acceptEnrollment was called
    expect(global.fetch).toHaveBeenCalledWith('http://localhost:4000/api/enrollmentRoute/accept', expect.any(Object));

    // Ensure that after click accept once, you only have another student left on page
    await waitFor(() => {
      expect(queryByText('John Doe')).not.toBeInTheDocument();
    });
  });

  it('calls rejectEnrollment when reject button is clicked', async () => {
    const { getAllByText, queryByText } = render(<MemoryRouter><PendingEnrollments /></MemoryRouter>);

    // Wait for the component to fetch data and render
    await waitFor(() => {
      const rejectButton = getAllByText('Reject')[0];
      fireEvent.click(rejectButton);
    });

    // Assert that rejectEnrollment was called
    expect(global.fetch).toHaveBeenCalledWith('http://localhost:4000/api/enrollmentRoute/reject/1', expect.any(Object));

    // Ensure that after click reject once, you only have another student left on page
    await waitFor(() => {
      expect(queryByText('John Doe')).not.toBeInTheDocument();
    });
  });
});
