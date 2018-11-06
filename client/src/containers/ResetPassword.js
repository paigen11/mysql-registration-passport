import React, { Component } from 'react';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';

import {
  LinkButtons,
  updateButton,
  homeButton,
  loginButton,
  HeaderBar,
  forgotButton,
  inputStyle,
  SubmitButtons,
} from '../components';

const loading = {
  margin: '1em',
  fontSize: '24px',
};

const title = {
  pageTitle: 'Password Reset Screen',
};

export default class ResetPassword extends Component {
  constructor() {
    super();

    this.state = {
      password: '',
      confirmPassword: '',
      update: false,
      isLoading: true,
      error: false,
    };
  }

  async componentDidMount() {
    console.log(this.props.match.params.token);
    await axios
      .get('http://localhost:3003/reset', {
        params: {
          resetPasswordToken: this.props.match.params.token,
        },
      })
      .then(response => {
        console.log(response);
        if (response.data.message === 'password reset link a-ok') {
          this.setState({
            update: false,
            isLoading: false,
            error: false,
          });
        } else {
          this.setState({
            update: false,
            isLoading: false,
            error: true,
          });
        }
      })
      .catch(error => {
        console.log(error.data);
      });
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  updatePassword = e => {
    e.preventDefault();
    axios
      .put('http://localhost:3003/updatePassword', {
        password: this.state.password,
      })
      .then(response => {
        console.log(response.data);
        this.setState({
          updated: true,
          error: false,
        });
      })
      .catch(error => {
        console.log(error.data);
      });
  };

  render() {
    const { password, error, isLoading, updated } = this.state;

    if (error) {
      return (
        <div>
          <HeaderBar title={title} />
          <div style={loading}>
            Problem reseting password. Please send another reset link.
            <LinkButtons
              buttonStyle={forgotButton}
              buttonText={'Forgot Password?'}
              link={'/forgotPassword'}
            />
          </div>
        </div>
      );
    } else if (isLoading) {
      return (
        <div>
          <HeaderBar title={title} />
          <div style={loading}>Loading User Data...</div>
        </div>
      );
    } else {
      return (
        <div>
          <HeaderBar title={title} />
          <form className="password-form" onSubmit={this.updatePassword}>
            <TextField
              style={inputStyle}
              id="password"
              label="password"
              onChange={this.handleChange('password')}
              value={password}
              type="password"
            />
            <SubmitButtons
              buttonStyle={updateButton}
              buttonText={'Update Password'}
            />
          </form>

          {updated && (
            <div>
              <p>
                Your password has been successfully reset, please try logging in
                again.
              </p>
              <LinkButtons
                buttonStyle={loginButton}
                buttonText={'Login'}
                link={`/login`}
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
    }
  }
}
