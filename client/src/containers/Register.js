import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';

import {
  LinkButtons,
  SubmitButtons,
  registerButton,
  homeButton,
  loginButton,
  inputStyle,
  HeaderBar,
} from '../components';

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
    if (this.state.username === '' || this.state.password === '') {
      this.setState({
        showError: true,
        loginError: false,
        registerError: true,
      });
    } else {
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
          } else {
            this.setState({
              messageFromServer: response.data.message,
              showError: false,
              loginError: false,
              registerError: false,
            });
          }
        })
        .catch(error => {
          console.log(error.data);
        });
    }
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
            <SubmitButtons
              buttonStyle={registerButton}
              buttonText={'Register'}
            />
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
                <LinkButtons
                  buttonText={`Login`}
                  buttonStyle={loginButton}
                  link={'/login'}
                />
              </div>
            )}
          <LinkButtons
            buttonText={`Go Home`}
            buttonStyle={homeButton}
            link={'/'}
          />
        </div>
      );
    } else if (messageFromServer === 'user created') {
      return (
        <div>
          <HeaderBar title={title} />
          <h3>User successfully registered!</h3>
          <LinkButtons
            buttonText={`Go Login`}
            buttonStyle={loginButton}
            link={`/login`}
          />
        </div>
      );
    }
  }
}

export default Register;
