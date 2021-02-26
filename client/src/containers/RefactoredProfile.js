import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Table from '@material-ui/core/Table';
import Button from '@material-ui/core/Button';
import { Redirect, useHistory } from 'react-router-dom';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import {
  LinkButtons,
  deleteButton,
  updateButton,
  loginButton,
  logoutButton,
  HeaderBar,
  forgotButton,
} from '../components';

const loading = {
  margin: '1em',
  fontSize: '24px',
};

const title = {
  pageTitle: 'Refactored User Profile Screen',
};

export const Profile = (props) => {
  const urlUsername = props.match.params.username;

  const [userInfo, setUserInfo] = useState({
    first_name: '',
    last_name: '',
    email: '',
    username: '',
    password: '',
    deleted: false,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const history = useHistory();

  useEffect(() => {
    const accessString = localStorage.getItem('JWT');
    if (accessString == null) {
      setIsLoading(false);
      setError(true);
    }
    const getUserInfo = async () => {
      try {
        const { data } = await axios.get(
          'http://localhost:3003/refactoredFindUser',
          {
            params: {
              urlUsername,
            },
            headers: { Authorization: `JWT ${accessString}` },
          },
        );
        setUserInfo({
          first_name: data.first_name,
          last_name: data.last_name,
          email: data.email,
          username: data.username,
          password: data.password,
        });
        setIsLoading(false);
        setError(false);
      } catch (err) {
        console.error(
          `Error occurred trying to find user ${err.response.data}`,
        );
        setError(true);
      }
    };
    if (urlUsername) {
      getUserInfo();
    }
  }, [urlUsername]);

  const deleteUser = async (e) => {
    const accessString = localStorage.getItem('JWT');
    if (accessString == null) {
      setIsLoading(false);
      setError(true);
    }
    e.preventDefault();
    try {
      await axios.delete('http://localhost:3003/deleteUser', {
        params: {
          urlUsername,
        },
        headers: { Authorization: `JWT ${accessString}` },
      });
      localStorage.removeItem('JWT');
      setUserInfo({ deleted: true });
    } catch (err) {
      console.error(err.response.data);
      setError(true);
    }
  };

  const logout = (e) => {
    e.preventDefault();
    localStorage.removeItem('JWT');
    history.push('/');
  };

  const {
    first_name,
    last_name,
    email,
    username,
    password,
    deleted,
  } = userInfo;

  if (error) {
    return (
      <div>
        <HeaderBar title={title} />
        <div style={loading}>
          Problem fetching user data. Please login again.
        </div>
        <LinkButtons
          buttonText="Login"
          buttonStyle={loginButton}
          link="/login"
          onClick={logout}
        />
      </div>
    );
  }
  if (isLoading) {
    return (
      <div>
        <HeaderBar title={title} />
        <div style={loading}>Loading User Data...</div>
      </div>
    );
  }
  if (deleted) {
    return <Redirect to="/" />;
  }
  return (
    <div>
      <HeaderBar title={title} />
      <Table>
        <TableBody>
          <TableRow>
            <TableCell>First Name</TableCell>
            <TableCell>{first_name}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Last Name</TableCell>
            <TableCell>{last_name}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Email</TableCell>
            <TableCell>{email}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>User Name</TableCell>
            <TableCell>{username}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Password</TableCell>
            <TableCell style={{ WebkitTextSecurity: 'disc' }}>
              {password}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <Button
        style={deleteButton}
        variant="contained"
        color="primary"
        onClick={deleteUser}
      >
        Delete User
      </Button>
      <LinkButtons
        buttonStyle={updateButton}
        buttonText="Update User"
        link={`/updateUser/${username}`}
      />
      <LinkButtons
        buttonStyle={forgotButton}
        buttonText="Update Password"
        link={`/updatePassword/${username}`}
      />
      <Button
        style={logoutButton}
        variant="contained"
        color="primary"
        onClick={logout}
      >
        Logout
      </Button>
    </div>
  );
};

Profile.propTypes = {
  // eslint-disable-next-line react/require-default-props
  match: PropTypes.shape({
    params: PropTypes.shape({
      username: PropTypes.string.isRequired,
    }),
  }),
};

export default Profile;
