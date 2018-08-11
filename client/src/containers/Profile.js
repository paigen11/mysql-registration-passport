import React, { Component } from 'react';
import HeaderBar from '../components/HeaderBar';
import Button from '@material-ui/core/Button';
import { Link, Redirect } from 'react-router-dom';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import axios from 'axios';

const linkStyle = {
  textDecoration: 'none',
  color: 'white',
};

const deleteButton = {
  background: 'red',
  padding: '1em',
  margin: '1em',
};

const updateButton = {
  background: 'orange',
  padding: '1em',
  margin: '1em',
};

const loginButton = {
  background: 'royalblue',
  padding: '1em',
  margin: '1em',
};

const logoutButton = {
  padding: '1em',
  margin: '1em',
};

const loading = {
  margin: '1em',
  fontSize: '24px',
};

const title = {
  pageTitle: 'User Profile Screen',
};

class Profile extends Component {
  constructor() {
    super();

    this.state = {
      first_name: '',
      last_name: '',
      email: '',
      username: '',
      password: '',
      isLoading: true,
      deleted: false,
      error: false,
    };
  }

  async componentDidMount() {
    let accessString = localStorage.getItem('jwtToken');
    if (accessString === null) {
      this.setState({
        isLoading: false,
        error: true,
      });
    }
    await axios
      .get('http://localhost:3003/findUser', {
        params: {
          username: this.props.match.params.username,
        },
        headers: { 'x-access-token': accessString },
      })
      .then(response => {
        this.setState({
          first_name: response.data.first_name,
          last_name: response.data.last_name,
          email: response.data.email,
          username: response.data.username,
          password: response.data.password,
          isLoading: false,
          error: false,
        });
      })
      .catch(error => {
        console.log(error.data);
      });
  }

  deleteUser = e => {
    let accessString = localStorage.getItem('jwtToken');
    if (accessString === null) {
      this.setState({
        loadingUser: false,
        error: true,
      });
    }

    e.preventDefault();
    axios
      .delete('http://localhost:3003/deleteUser', {
        params: {
          username: this.props.match.params.username,
        },
        headers: { 'x-access-token': accessString },
      })
      .then(response => {
        console.log(response.data);
        localStorage.removeItem('jwtToken');
        this.setState({
          deleted: true,
        });
      })
      .catch(error => {
        console.log(error.data);
      });
  };

  logout = e => {
    e.preventDefault();
    localStorage.removeItem('jwtToken');
  };

  render() {
    const {
      first_name,
      last_name,
      email,
      username,
      password,
      error,
      isLoading,
      deleted,
    } = this.state;

    if (error) {
      return (
        <div>
          <HeaderBar title={title} />
          <div style={loading}>
            Problem fetching user data. Please login again.
          </div>
          <Button style={loginButton} variant="contained" color="primary">
            <Link style={linkStyle} to="/login">
              Go Login
            </Link>
          </Button>
        </div>
      );
    } else if (isLoading) {
      return (
        <div>
          <HeaderBar title={title} />
          <div style={loading}>Loading User Data...</div>
        </div>
      );
    } else if (deleted) {
      return <Redirect to="/" />;
    } else {
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
            onClick={this.deleteUser}
          >
            Delete User
          </Button>
          <Button style={updateButton} variant="contained" color="primary">
            <Link style={linkStyle} to={`/updateUser/${username}`}>
              Update User
            </Link>
          </Button>
          <Button
            style={logoutButton}
            variant="contained"
            color="primary"
            onClick={this.logout}
          >
            <Link style={linkStyle} to={'/'}>
              Logout
            </Link>
          </Button>
        </div>
      );
    }
  }
}

export default Profile;
