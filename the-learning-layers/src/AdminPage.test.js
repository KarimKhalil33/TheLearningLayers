import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import AdminPage from './AdminPage';
import { MemoryRouter } from 'react-router-dom';
import { act } from '@testing-library/react';

describe('AdminPage component', () => {
  //Before each test run, mock these things
  beforeEach(() => {
    // Mock sessionStorage
    Object.defineProperty(window, 'sessionStorage', {
      value: {
        getItem: jest.fn(() => 'dummyAuthenticationId'),
      },
      writable: true,
    });

    //Mocking landing window href location
    global.window = Object.create(window);
    const url = "http://localhost/viewCourseAdmin?name=EDUC&courseId=100"; //target url for page changes
    Object.defineProperty(window, "location", {
      value: {
        href: url
      },
      writable: true
    });
    // Mock fetch
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok:true,
        json: () =>
          Promise.resolve([
            { name: 'EDUC', courseId: 100, _id:1233456 },
          ]),
      })
    );
  });

  //after each test clear each mock test
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders welcome message and course cards', async () => {
    const { getByText, getAllByRole } = render(<MemoryRouter>
      <AdminPage />
    </MemoryRouter>);

    //expect these text be in the website on page load
    expect(getByText('ADMIN DASHBOARD')).toBeInTheDocument();
    expect(getByText('Manage courses and student enrollments.')).toBeInTheDocument();

    // Wait for fetch to complete and render course cards
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledTimes(1);
      expect(getAllByRole('heading', { name: /EDUC 100/ })).toHaveLength(1);
    });
  });

  //test that when view course button is clicked
  test('clicking View Course button navigates to view course page', async () => {
    const { getAllByRole } = render(<MemoryRouter>
      <AdminPage />
    </MemoryRouter>);

    //check that I have existing card on the website
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledTimes(1);
      expect(getAllByRole('heading', { name: /EDUC 100/ })).toHaveLength(1);
    });


    // Get all buttons with the name "View"
    const viewCourseButtons = screen.getAllByRole('button', { name: /view/i });

    //wrapped in act for asynchronous tests
    act(() => {
      // Iterate through each button and fire a click event
      viewCourseButtons.forEach(button => {
        fireEvent.click(button);
      });
    })

    // Check if navigation occurred
    await waitFor(() => {
      expect(window.location.href).toBe(`http://localhost/viewCourseAdmin?name=EDUC&courseId=100`);
    })
  });

  test('clicking delete icon deletes course', async () => {
    const { queryByText } = render(<MemoryRouter>
      <AdminPage />
    </MemoryRouter>);

    //check that I have existing card on the website
    await waitFor(() => {
      const del = screen.getByTestId('delete');
      // Wait for the component to fetch data and render
      fireEvent.click(del);
    });

    // Assert that rejectEnrollment was called
    expect(global.fetch).toHaveBeenCalledWith('http://localhost:4000/api/adminRoute/delete', {
      method: 'DELETE',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({ courseId:1233456 }),
  });

    // Ensure that after click reject once, you only have another student left on page
    await waitFor(() => {
      expect(queryByText('EDUC 100')).not.toBeInTheDocument();
    });

  });


});
