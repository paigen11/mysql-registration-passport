import React from 'react';
import { act, screen, render, cleanup } from '@testing-library/react';
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
    let localStorageMock = (() => {
      var storage = {};
      return {
        setItem: jest.fn((key, value) => {
          storage[key] = value || '';
        }),
        getItem: jest.fn((key) => {
          return storage[key] || null;
        }),
        removeItem: jest.fn((key) => {
          delete storage[key];
        }),
      };
    })();
    Object.defineProperty(window, 'localStorage', { value: localStorageMock });
    window.localStorage.setItem('JWT', 'token');
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
      'http://localhost:3003/deleteUser': {
        deleted: true,
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

  it('should render the user profile page when a user has sucessfully logged in', async () => {
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
    expect(window.localStorage.getItem).toBeCalledWith('JWT');
    expect(window.localStorage.getItem('JWT')).toBe('token');
    expect(await screen.findByText('Test')).toBeInTheDocument();
    expect(await screen.findByText('test@test.com')).toBeInTheDocument();
    expect(await screen.findByText('1234')).toBeInTheDocument();
    expect(await screen.findByText('Delete User')).toBeInTheDocument();
    expect(await screen.findByText('Update User')).toBeInTheDocument();
    expect(await screen.findByText('Update Password')).toBeInTheDocument();
    expect(await screen.findByText('Logout')).toBeInTheDocument();
  });

  it('should allow a user to click button to update their profile info', async () => {
    await act(async () => {
      render(
        <Router>
          <RefactoredProfile {...props} />
        </Router>,
      );
    });
    userEvent.click(await screen.findByText('Update User'));
    expect(
      await (await screen.findByText('Update User')).closest('a'),
    ).toHaveAttribute('href', '/updateUser/tester');
  });

  it('should allow a user to click button to update their password', async () => {
    await act(async () => {
      render(
        <Router>
          <RefactoredProfile {...props} />
        </Router>,
      );
    });
    userEvent.click(await screen.findByText('Update Password'));
    expect(
      await (await screen.findByText('Update Password')).closest('a'),
    ).toHaveAttribute('href', '/updatePassword/tester');
  });

  it('should allow a user to click button to log back out', async () => {
    await act(async () => {
      render(
        <Router>
          <RefactoredProfile {...props} />
        </Router>,
      );
    });
    expect(window.localStorage.getItem('JWT')).toBe('token');
    userEvent.click(await screen.findByText('Logout'));
    expect(window.localStorage.removeItem).toBeCalledWith('JWT');
    expect(window.localStorage.removeItem).toHaveBeenCalledTimes(1);
    expect(window.localStorage.getItem('JWT')).toBe(null);
    expect(
      await (await screen.findByText('Logout')).closest('a'),
    ).toHaveAttribute('href', '/');
  });

  it('should allow a user to click button to delete their profile', async () => {
    const mockDeleteUser = axios.delete.mockImplementation((url, username) => {
      return Promise.resolve({ data: { deleted: true } });
    });
    await act(async () => {
      render(
        <Router>
          <RefactoredProfile {...props} deleteUser={mockDeleteUser} />
        </Router>,
      );
    });
    await act(async () => {
      userEvent.click(await screen.findByText('Delete User'));
    });
    expect(mockDeleteUser.mock.calls.length).toBe(1);
    expect(mockDeleteUser).toBeCalledWith('http://localhost:3003/deleteUser', {
      headers: { Authorization: 'JWT token' },
      params: { urlUsername: 'tester' },
    });
    expect(window.localStorage.removeItem).toBeCalledWith('JWT');
    expect(window.localStorage.getItem('JWT')).toBe(null);
  });
});
