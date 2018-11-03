import React, { Component } from 'react';
import { HeaderBar, Buttons, loginButton, registerButton } from '../components';

const title = {
  pageTitle: 'Home Screen',
};

class Home extends Component {
  render() {
    return (
      <div className="home-page">
        <HeaderBar title={title} />
        <Buttons
          buttonText={`Register`}
          buttonStyle={registerButton}
          link={`/register`}
        />
        <Buttons
          buttonText={`Login`}
          buttonStyle={loginButton}
          link={`/login`}
        />
      </div>
    );
  }
}

export default Home;
