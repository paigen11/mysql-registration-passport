import React, { Component, Fragment } from 'react';
import Button from '@material-ui/core/Button';

export default class SubmitButtons extends Component {
  render() {
    const { buttonText, buttonStyle } = this.props;
    return (
      <Fragment>
        <Button
          style={buttonStyle}
          type="submit"
          variant="contained"
          color="primary"
        >
          {buttonText}
        </Button>
      </Fragment>
    );
  }
}
