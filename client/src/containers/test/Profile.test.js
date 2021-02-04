import React from 'react';
import { configure, mount } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import axios from 'axios';
import { BrowserRouter as Router } from 'react-router-dom';
import Profile from '../Profile';

jest.mock('axios');

configure({
  adapter: new EnzymeAdapter(),
});

describe('Testing user profile with Jest and Enzyme testing libraries', () => {
  const props = {
    match: {
      params: {
        username: 'ogUser',
      },
    },
  };
  let getSpy;
  let deleteSpy;
  let container;

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
    window.localStorage.setItem('JWT', 'og token');
    getSpy = jest.spyOn(axios, 'get').mockResolvedValue({
      data: {
        auth: true,
        first_name: 'Origial',
        last_name: 'User',
        email: 'og@user.com',
        username: 'ogUser',
        password: '5678',
        message: 'user found in db',
        deleted: false,
        isLoading: false,
        error: false,
      },
    });
    deleteSpy = jest.spyOn(axios, 'delete').mockResolvedValue({
      data: {
        deleted: true,
      },
    });

    container = mount(
      <Router>
        <Profile {...props} deleteUser={deleteSpy} />
      </Router>,
    );
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should allow a user to see their profile and click button to delete their profile', async () => {
    container.setState({ isLoading: false, error: false });
    await container.instance().componentDidMount();
    expect(getSpy).toHaveBeenCalledTimes(1);
    expect(getSpy).toHaveBeenCalledWith('http://localhost:3003/findUser', {
      headers: { Authorization: 'JWT og token' },
      params: { username: 'ogUser' },
    });
    await container.find('.MuiButton-label-81').first().simulate('click');
    expect(deleteSpy).toHaveBeenCalledTimes(1);
    expect(deleteSpy).toHaveBeenCalledWith('http://localhost:3003/deleteUser', {
      headers: { Authorization: 'JWT og token' },
      params: { username: 'ogUser' },
    });
    expect(window.localStorage.getItem).toHaveBeenCalledTimes(2);
    expect(window.localStorage.getItem).toHaveBeenCalledWith('JWT');
    expect(window.localStorage.getItem('JWT')).toBe('og token');
  });
});
