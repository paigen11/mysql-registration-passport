/* eslint-disable camelcase */
/* eslint-disable no-console */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';

import {
  LinkButtons,
  SubmitButtons,
  HeaderBar,
  homeButton,
  cancelButton,
  saveButton,
  loginButton,
  inputStyle,
} from '../components';

const loading = {
  margin: '1em',
  fontSize: '24px',
};

const title = {
  pageTitle: 'Update User Profile Screen',
};

class UpdateProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      first_name: '',
      last_name: '',
      email: '',
      username: '',
      password: '',
      loadingUser: false,
      updated: false,
      error: false,
    };
  }

  async componentDidMount() {
    this.setState({ loadingUser: true });

    const accessString = localStorage.getItem('JWT');
    if (accessString === null) {
      this.setState({
        loadingUser: false,
        error: true,
      });
    }
    const {
      match: {
        params: { username },
      },
    } = this.props;
    try {
      const response = await axios.get('http://localhost:3003/findUser', {
        params: {
          username,
        },
        headers: { Authorization: `JWT ${accessString}` },
      });
      console.log(response.data);
      this.setState({
        loadingUser: false,
        first_name: response.data.first_name ? response.data.first_name : '',
        last_name: response.data.last_name ? response.data.last_name : '',
        email: response.data.email,
        username: response.data.username,
        password: response.data.password,
        error: false,
      });
    } catch (error) {
      console.log(error.response.data);
      this.setState({
        loadingUser: false,
        error: true,
      });
    }
  }

  handleChange = name => (event) => {
    this.setState({
      [name]: event.target.value,
    });
  };

  updateUser = async (e) => {
    const accessString = localStorage.getItem('JWT');
    if (accessString === null) {
      this.setState({
        loadingUser: false,
        error: true,
      });
    }
    const {
 first_name, last_name, email, username 
} = this.state;
    e.preventDefault();
    try {
      const response = await axios.put(
        'http://localhost:3003/updateUser',
        {
          first_name,
          last_name,
          email,
          username,
        },
        {
          headers: { Authorization: `JWT ${accessString}` },
        },
      );
      // eslint-disable-next-line no-unused-vars
      console.log(response.data);
      this.setState({
        updated: true,
        error: false,
      });
    } catch (error) {
      console.log(error.response.data);
      this.setState({
        loadingUser: false,
        error: true,
      });
    }
  };

  // eslint-disable-next-line consistent-return
  render() {
    const {
      first_name,
      last_name,
      email,
      username,
      password,
      updated,
      error,
      loadingUser,
    } = this.state;

    if (error) {
      return (
        <div>
          <HeaderBar title={title} />
          <p style={loading}>
            There was a problem accessing your data. Please go login again.
          </p>
          <LinkButtons
            style={loginButton}
            buttonText="Go Login"
            link="/login"
          />
        </div>
      );
    }
    if (loadingUser !== false) {
      return (
        <div>
          <HeaderBar title={title} />
          <p style={loading}>Loading user data...</p>
        </div>
      );
    }
    if (loadingUser === false && updated === true) {
      return <Redirect to={`/userProfile/${username}`} />;
    }
    if (loadingUser === false) {
      return (
        <div>
          <HeaderBar title={title} />
          <form className="profile-form" onSubmit={this.updateUser}>
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
              readOnly
              disabled
            />
            <TextField
              style={inputStyle}
              id="password"
              label="password"
              value={password}
              readOnly
              disabled
              type="password"
            />
            <SubmitButtons buttonStyle={saveButton} buttonText="Save Changes" />
          </form>
          <LinkButtons buttonStyle={homeButton} buttonText="Go Home" link="/" />
          <LinkButtons
            buttonStyle={cancelButton}
            buttonText="Cancel Changes"
            link={`/userProfile/${username}`}
          />
        </div>
      );
    }
  }
}

UpdateProfile.propTypes = {
  // eslint-disable-next-line react/require-default-props
  match: PropTypes.shape({
    params: PropTypes.shape({
      username: PropTypes.string.isRequired,
    }),
  }),
};

export default UpdateProfile;
