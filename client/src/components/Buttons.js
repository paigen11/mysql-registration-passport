import React, { Component, Fragment } from 'react';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

import { linkStyle } from './ButtonStyles';

export default class Buttons extends Component {
  static defaultProps = {
    link: '/',
  };

  render() {
    const { buttonText, buttonStyle, link } = this.props;
    return (
      <Fragment>
        <Button variant="contained" color="primary" style={buttonStyle}>
          <Link style={linkStyle} to={link}>
            {buttonText}
          </Link>
        </Button>
      </Fragment>
    );
  }
}
