import React from 'react';
import {
  act,
  screen,
  render,
  cleanup,
  prettyDOM,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter as Router } from 'react-router-dom';
import axios from 'axios';
import RefactoredProfile from '../RefactoredProfile';

jest.mock('axios');

describe('Testing refactored user profile with React Testing Library', () => {
  const props = {
    match: {
      params: {
        username: 'tester',
      },
    },
  };
  let mockData;

  beforeEach(() => {
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: jest.fn(() => 'token'),
      },
      writable: true,
    });

    mockData = {
      'http://localhost:3003/refactoredFindUser': {
        auth: true,
        first_name: 'Test',
        last_name: 'McTesterson',
        email: 'test@test.com',
        username: 'tester',
        password: '1234',
        message: 'user found in db',
        deleted: false,
      },
    };
    axios.get.mockImplementation((url) => {
      const result = mockData[url];
      return Promise.resolve({ data: result });
    });
  });

  afterEach(() => {
    cleanup();
  });

  it("should render the user profile page when a user's has sucessfully logged in", async () => {
    let container;
    await act(async () => {
      container = render(
        <Router>
          <RefactoredProfile {...props} />
        </Router>,
      );
    });
    expect(container).toBeTruthy();
    expect(window.localStorage.getItem).toHaveBeenCalledTimes(1);
    expect(await screen.findByText('Test')).toBeInTheDocument();
    expect(await screen.findByText('test@test.com')).toBeInTheDocument();
    expect(await screen.findByText('1234')).toBeInTheDocument();
    expect(await screen.findByText('Delete User')).toBeInTheDocument();
    expect(await screen.findByText('Update User')).toBeInTheDocument();
    expect(await screen.findByText('Update Password')).toBeInTheDocument();
    expect(await screen.findByText('Logout')).toBeInTheDocument();
  });

  it('should allow a user to click button to update their profile info', async () => {
    let container;
    await act(async () => {
      container = render(
        <Router>
          <RefactoredProfile {...props} />
        </Router>,
      );
    });
    // click update user button
  });

  it('should allow a user to click button to update their password', async () => {
    let container;
    await act(async () => {
      container = render(
        <Router>
          <RefactoredProfile {...props} />
        </Router>,
      );
    });
    // click update password button
  });

  it('should allow a user to click button to log back out', async () => {
    let container;
    await act(async () => {
      container = render(
        <Router>
          <RefactoredProfile {...props} />
        </Router>,
      );
    });
    // click logout button
  });

  it('should allow a user to click button to delete their profile', async () => {
    let container;
    await act(async () => {
      container = render(
        <Router>
          <RefactoredProfile {...props} />
        </Router>,
      );
    });
    // click delete user button
  });
});
