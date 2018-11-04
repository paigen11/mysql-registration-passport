import React, { Component } from 'react';
import {
  HeaderBar,
  LinkButtons,
  loginButton,
  registerButton,
} from '../components';

const title = {
  pageTitle: 'Home Screen',
};

class Home extends Component {
  render() {
    return (
      <div className="home-page">
        <HeaderBar title={title} />
        <LinkButtons
          buttonText={`Register`}
          buttonStyle={registerButton}
          link={`/register`}
        />
        <LinkButtons
          buttonText={`Login`}
          buttonStyle={loginButton}
          link={`/login`}
        />
      </div>
    );
  }
}

export default Home;
