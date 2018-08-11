import React, { Component } from 'react';
import HeaderBar from '../components/HeaderBar';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';

const registerButton = {
  background: 'green',
  padding: '1em',
  margin: '1em',
};

const homeButton = {
  background: 'mediumpurple',
  padding: '1em',
  margin: '1em',
};

const loginButton = {
  background: 'royalblue',
  padding: '1em',
  margin: '1em',
};

const inputStyle = {
  margin: '.5em',
};

const linkStyle = {
  textDecoration: 'none',
  color: 'white',
};

const title = {
  pageTitle: 'Register Screen',
};

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      first_name: '',
      last_name: '',
      email: '',
      username: '',
      password: '',
      messageFromServer: '',
      showError: false,
      registerError: false,
      loginError: false,
    };
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  registerUser = e => {
    e.preventDefault();
    axios
      .post('http://localhost:3003/registerUser', {
        first_name: this.state.first_name,
        last_name: this.state.last_name,
        email: this.state.email,
        username: this.state.username,
        password: this.state.password,
      })
      .then(response => {
        console.log(response.data);
        if (response.data === 'username already taken') {
          this.setState({
            showError: true,
            loginError: true,
            registerError: false,
          });
        } else if (response.data === 'username and password required') {
          this.setState({
            showError: true,
            registerError: true,
            loginError: false,
          });
        } else {
          this.setState({
            messageFromServer: response.data,
            showError: false,
            loginError: false,
            registerError: false,
          });
        }
      })
      .catch(error => {
        console.log(error.data);
      });
  };

  render() {
    const {
      first_name,
      last_name,
      email,
      username,
      password,
      messageFromServer,
      showError,
      loginError,
      registerError,
    } = this.state;

    if (messageFromServer === '') {
      return (
        <div>
          <HeaderBar title={title} />
          <form className="profile-form" onSubmit={this.registerUser}>
            <TextField
              style={inputStyle}
              id="first_name"
              label="first_name"
              value={first_name}
              onChange={this.handleChange('first_name')}
              placeholder="First Name"
            />
            <TextField
              style={inputStyle}
              id="last_name"
              label="last_name"
              value={last_name}
              onChange={this.handleChange('last_name')}
              placeholder="Last Name"
            />
            <TextField
              style={inputStyle}
              id="email"
              label="email"
              value={email}
              onChange={this.handleChange('email')}
              placeholder="Email"
            />
            <TextField
              style={inputStyle}
              id="username"
              label="username"
              value={username}
              onChange={this.handleChange('username')}
              placeholder="Username"
            />
            <TextField
              style={inputStyle}
              id="password"
              label="password"
              value={password}
              onChange={this.handleChange('password')}
              placeholder="Password"
              type="password"
            />
            <Button
              style={registerButton}
              type="submit"
              variant="contained"
              color="primary"
            >
              Register
            </Button>
          </form>
          {showError === true &&
            registerError === true && (
              <div>
                <p>Username and password are required fields.</p>
              </div>
            )}
          {showError === true &&
            loginError === true && (
              <div>
                <p>
                  That username is already taken. Please choose another or
                  login.
                </p>
                <Button style={loginButton} variant="contained" color="primary">
                  <Link style={linkStyle} to="/login">
                    Go Login
                  </Link>
                </Button>
              </div>
            )}
          <Button style={homeButton} variant="contained" color="primary">
            <Link style={linkStyle} to="/">
              Go Home
            </Link>
          </Button>
        </div>
      );
    } else if (messageFromServer === 'user created') {
      return (
        <div>
          <HeaderBar title={title} />
          <h3>User successfully registered!</h3>
          <Button style={loginButton} variant="contained" color="primary">
            <Link style={linkStyle} to="/login">
              Go Login
            </Link>
          </Button>
        </div>
      );
    }
  }
}

export default Register;
