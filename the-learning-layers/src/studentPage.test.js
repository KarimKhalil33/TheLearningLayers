import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import StudentPage from './studentPage';
import { MemoryRouter } from 'react-router-dom';
import { act } from '@testing-library/react';

describe('StudentPage component', () => {
  //Before each test run, mock these things
  beforeEach(() => {
    // Mock sessionStorage
    sessionStorage.setItem('authenticationId', JSON.stringify('test_username'));

    //Mocking landing window href location
    global.window = Object.create(window);
    const url = "http://localhost/viewCourseStudent"; //target url for page changes
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
            { name:'COSC',courseId: 101 },
            {name:'COSC',courseId:111 },
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
      <StudentPage />
    </MemoryRouter>);

//expect these text be in the website on page load
    expect(getByText('WELCOME TO LEARNING LAYERS')).toBeInTheDocument();
    expect(getByText('A better way to learn, anywhere and anytime.')).toBeInTheDocument();
    expect(getByText('Explore your courses, track your progress, and engage with your classmates and instructors.')).toBeInTheDocument();

    // Wait for fetch to complete and render course cards
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledTimes(1);
      expect(getAllByRole('heading', { name: /COSC 101|COSC 111/ })).toHaveLength(2);
    });
  });

  //test that when view course button is clicked
  test('clicking View Course button navigates to view course page', async () => {
    const { getAllByRole } = render(<MemoryRouter>
      <StudentPage />
    </MemoryRouter>);
    
    //check that I have existing card on the website
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledTimes(1);
      expect(getAllByRole('heading', { name: /COSC 101|COSC 111/ })).toHaveLength(2);
    });


    // Get all buttons with the name "View Course"
    const viewCourseButtons = screen.getAllByRole('button', { name: /view course/i });

    //wrapped in act for asynchronous tests
    act(() => {
      // Iterate through each button and fire a click event
      viewCourseButtons.forEach(button => {
        fireEvent.click(button);
      });
    })

    // Check if navigation occurred
    await waitFor(() => {
      expect(window.location.href).toBe('http://localhost/viewCourseStudent');
    })
  });


});
