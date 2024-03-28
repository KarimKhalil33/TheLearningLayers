import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import PendingEnrollments from './pendingEnrollments';
import { MemoryRouter } from 'react-router-dom';
import { act } from '@testing-library/react';

// Mocking the fetch function
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({}),
  })
);

describe('PendingEnrollments component', () => {
  beforeEach(() => {
    fetch.mockClear();
  });


  it('calls acceptEnrollment when accept button is clicked', async () => {
    const { } = render(<MemoryRouter><PendingEnrollments /></MemoryRouter>);
    // Get all buttons with the name Accept
    const viewCourseButtons = screen.getAllByText('Accept');

    //wrapped in act for asynchronous tests
    act(() => {
      // Iterate through each button and fire a click event
      viewCourseButtons.forEach(button => {
        fireEvent.click(button);
      });
    })
    //Wait for fetch to complete and send request
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith('http://localhost:4000/api/enrolmentRoute/accept', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title: 'Introduction to Programming', studentNum: 1 })
      });
    });
  });

  it('calls rejectEnrollment when reject button is clicked', async () => {
    const { getByText } = render(<MemoryRouter><PendingEnrollments /></MemoryRouter>);

    // Get all buttons with the name Reject
    const viewCourseButtons = screen.getAllByText('Accept');

    //wrapped in act for asynchronous tests
    act(() => {
      // Iterate through each button and fire a click event
      viewCourseButtons.forEach(button => {
        fireEvent.click(button);
      });
    })
    //Wait for fetch to complete and send request
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledTimes(2);
    });
  });
});
