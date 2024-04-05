import React from 'react';
import { render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ViewCourseStudent from './viewCourseStudent';
import { MemoryRouter } from 'react-router-dom';

describe('ViewCourseStudent component', () => {
    beforeEach(() => {
        // Mock window.location.search to simulate query parameters
        Object.defineProperty(window, 'location', {
            value: {
                search: '?name=COSC&courseId=101',
            },
            writable: true,
        });

        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: true,
                json: () =>
                    Promise.resolve({ name: 'COSC', courseId: 101, description: 'Something about digital citizenship' }),
            })
        );
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('renders course details based on query parameters', async () => {
        const { getByText } = render(
            <MemoryRouter>
                <ViewCourseStudent />
            </MemoryRouter>
        );

        // Wait for the component to fetch data and render
        await waitFor(() => {
            expect(global.fetch).toHaveBeenCalledWith(
                'http://localhost:4000/api/adminRoute/viewCourseStudent?name=COSC&courseId=101'
            );
        });

        await waitFor(() => {
            // Check if course details are rendered
            expect(getByText('COSC 101')).toBeInTheDocument();
            expect(getByText('Something about digital citizenship')).toBeInTheDocument();
        });
    });
});
