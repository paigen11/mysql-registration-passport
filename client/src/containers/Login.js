import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
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

const linkStyle = {
  textDecoration: 'none',
  color: 'white',
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

const title = {
  pageTitle: 'Login Screen',
};

class Login extends Component {
  constructor() {
    super();

    this.state = {
      username: '',
      password: '',
      loggedIn: false,
      showError: false,
    };
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  loginUser = e => {
    e.preventDefault();

    axios
      .get('http://localhost:3003/loginUser', {
        params: {
          username: this.state.username,
          password: this.state.password,
        },
      })
      .then(response => {
        if (
          response.data === 'bad username' ||
          response.data === 'passwords do not match'
        ) {
          this.setState({
            showError: true,
          });
        } else {
          localStorage.setItem('jwtToken', response.data.token);
          this.setState({
            loggedIn: true,
            showError: false,
          });
        }
      })
      .catch(error => {
        console.log(error.data);
      });
  };

  render() {
    const { username, password, showError, loggedIn } = this.state;
    if (!loggedIn) {
      return (
        <div>
          <HeaderBar title={title} />
          <form className="profile-form" onSubmit={this.loginUser}>
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
              style={loginButton}
              type="submit"
              variant="contained"
              color="primary"
            >
              Login
            </Button>
          </form>
          {showError && (
            <div>
              <p>
                That username or password isn't recognized. Please try again or
                register now.
              </p>
              <Button
                style={registerButton}
                variant="contained"
                color="primary"
              >
                <Link style={linkStyle} to="/register">
                  Go Register
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
    } else {
      return <Redirect to={`/userProfile/${username}`} />;
    }
  }
}

export default Login;
