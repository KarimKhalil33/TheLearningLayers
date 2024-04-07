import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import TeacherPage from './teacherPage';
import { MemoryRouter } from 'react-router-dom';
import { act } from '@testing-library/react';

describe('TeacherPage component', () => {
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
    const url = "http://localhost/viewCourseTeacher"; //target url for page changes
    Object.defineProperty(window, "location", {
      value: {
        href: url
      },
      writable: true
    });
    // Mock fetch
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve([
            { name: 'Introduction to Programming', courseId: 1 },
            { name: 'Advanced Programming', courseId: 2 },
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
      <TeacherPage />
    </MemoryRouter>);

//expect these text be in the website on page load
    expect(getByText('WELCOME TO LEARNING LAYERS')).toBeInTheDocument();
    expect(getByText('A better way to teach, anywhere and anytime.')).toBeInTheDocument();
    expect(getByText('Explore your courses, track your students\' progress, and engage with your class.')).toBeInTheDocument();

    // Wait for fetch to complete and render course cards
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledTimes(1);
      expect(getAllByRole('heading', { name: /Introduction to Programming|Advanced Programming/ })).toHaveLength(2);
    });
  });

  //test that when view course button is clicked
  test('clicking View Course button navigates to view course page', async () => {
    const { getAllByRole } = render(<MemoryRouter>
      <TeacherPage />
    </MemoryRouter>);
    
    //check that I have existing card on the website
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledTimes(1);
      expect(getAllByRole('heading', { name: /Introduction to Programming|Advanced Programming/ })).toHaveLength(2);
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
      expect(window.location.href).toBe('http://localhost/viewCourseTeacher');
    })
  });


});
