import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';

const SubmitButtons = ({ buttonText, buttonStyle }) => (
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

SubmitButtons.propTypes = {
  buttonText: PropTypes.string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  buttonStyle: PropTypes.object.isRequired,
};

export default SubmitButtons;
