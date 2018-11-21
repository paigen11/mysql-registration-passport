import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';

import {
  LinkButtons,
  SubmitButtons,
  registerButton,
  homeButton,
  forgotButton,
  inputStyle,
  HeaderBar,
} from '../components';

const title = {
  pageTitle: 'Forgot Password Screen',
};

class ForgotPassword extends Component {
  constructor() {
    super();

    this.state = {
      email: '',
      showError: false,
      messageFromServer: '',
    };
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  sendEmail = e => {
    e.preventDefault();
    if (this.state.email === '') {
      this.setState({
        showError: false,
        messageFromServer: '',
      });
    } else {
      axios
        .post('http://localhost:3003/forgotPassword', {
          email: this.state.email,
        })
        .then(response => {
          console.log(response.data);
          if (response.data === 'email not in db') {
            this.setState({
              showError: true,
              messageFromServer: '',
            });
          } else if (response.data === 'recovery email sent') {
            this.setState({
              showError: false,
              messageFromServer: 'recovery email sent',
            });
          }
        })
        .catch(error => {
          console.log(error.data);
        });
    }
  };

  render() {
    const { email, messageFromServer, showNullError, showError } = this.state;

    return (
      <div>
        <HeaderBar title={title} />
        <form className="profile-form" onSubmit={this.sendEmail}>
          <TextField
            style={inputStyle}
            id="email"
            label="email"
            value={email}
            onChange={this.handleChange('email')}
            placeholder="Email Address"
          />
          <SubmitButtons
            buttonStyle={forgotButton}
            buttonText={'Send Password Reset Email'}
          />
        </form>
        {showNullError && (
          <div>
            <p>The email address cannot be null.</p>
          </div>
        )}
        {showError && (
          <div>
            <p>
              That email address isn't recognized. Please try again or register
              for a new account.
            </p>
            <LinkButtons
              buttonText={`Register`}
              buttonStyle={registerButton}
              link={'/register'}
            />
          </div>
        )}
        {messageFromServer === 'recovery email sent' && (
          <div>
            <h3>Password Reset Email Successfully Sent!</h3>
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

export default ForgotPassword;
