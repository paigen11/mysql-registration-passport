import React, { Component } from 'react';
import HeaderBar from '../components/HeaderBar';
import { Link, Redirect } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios';

const linkStyle = {
  textDecoration: 'none',
  color: 'white',
};

const homeButton = {
  background: 'mediumpurple',
  padding: '1em',
  margin: '1em',
};

const cancelButton = {
  background: 'magenta',
  padding: '1em',
  margin: '1em',
};

const saveButton = {
  background: 'green',
  padding: '1em',
  margin: '1em',
};

const loginButton = {
  background: 'royalblue',
  padding: '1em',
  margin: '1em',
};

const loading = {
  margin: '1em',
  fontSize: '24px',
};

const inputStyle = {
  margin: '.5em',
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

  componentDidMount() {
    this.setState({ loadingUser: true });

    let accessString = localStorage.getItem('jwtToken');
    if (accessString === null) {
      this.setState({
        loadingUser: false,
        error: true,
      });
    }

    axios
      .get('http://localhost:3003/findUser', {
        params: {
          username: this.props.match.params.username,
        },
        headers: { 'x-access-token': accessString },
      })
      .then(response => {
        console.log(response.data);
        this.setState({
          loadingUser: false,
          first_name: response.data.first_name,
          last_name: response.data.last_name,
          email: response.data.email,
          username: response.data.username,
          password: response.data.password,
          error: false,
        });
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

  updateUser = e => {
    let accessString = localStorage.getItem('jwtToken');
    console.log(this.state.user);
    if (accessString === null) {
      this.setState({
        loadingUser: false,
        error: true,
      });
    }

    e.preventDefault();
    axios
      .put(
        'http://localhost:3003/updateUser',
        {
          first_name: this.state.first_name,
          last_name: this.state.last_name,
          email: this.state.email,
          username: this.state.username,
          password: this.state.password,
        },
        {
          headers: { 'x-access-token': accessString },
        },
      )
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
          <Button style={loginButton} variant="contained" color="primary">
            <Link style={linkStyle} to="/login">
              Go Login
            </Link>
          </Button>
        </div>
      );
    } else if (loadingUser !== false) {
      return (
        <div>
          <HeaderBar title={title} />
          <p style={loading}>Loading user data...</p>
        </div>
      );
    } else if (loadingUser === false && updated === true) {
      return <Redirect to={`/userProfile/${username}`} />;
    } else if (loadingUser === false) {
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
              onChange={this.handleChange('password')}
              placeholder="Password"
              type="password"
            />
            <Button
              style={saveButton}
              type="submit"
              variant="contained"
              color="primary"
            >
              Save Changes
            </Button>
          </form>
          <Button style={homeButton} variant="contained" color="primary">
            <Link style={linkStyle} to="/">
              Go Home
            </Link>
          </Button>
          <Button style={cancelButton} variant="contained" color="primary">
            <Link style={linkStyle} to={`/userProfile/${username}`}>
              Cancel Changes
            </Link>
          </Button>
        </div>
      );
    }
  }
}

export default UpdateProfile;
