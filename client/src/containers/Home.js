import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import {
  loginButton,
  registerButton,
  linkStyle,
  HeaderBar,
} from '../components';

const title = {
  pageTitle: 'Home Screen',
};

class Home extends Component {
  render() {
    return (
      <div className="home-page">
        <HeaderBar title={title} />
        <Button variant="contained" color="primary" style={registerButton}>
          <Link style={linkStyle} to="/register">
            Register
          </Link>
        </Button>
        <Button variant="contained" color="primary" style={loginButton}>
          <Link style={linkStyle} to="/login">
            Login
          </Link>
        </Button>
      </div>
    );
  }
}

export default Home;
