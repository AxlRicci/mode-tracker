import React from 'react';
import propTypes from 'prop-types';

import Alert from 'react-bootstrap/Alert';

import './alert-snackbar.styles.css';

const AlertSnackbar = ({ type, message, handleDismissAlert }) => {
  const variant = type === 'success' ? 'success' : 'danger';
  return (
    <Alert
      className="alert-bar"
      onClose={handleDismissAlert}
      variant={variant}
      dismissible
      transition
    >
      {message}
    </Alert>
  );
};

AlertSnackbar.propTypes = {
  type: propTypes.string,
  message: propTypes.string,
  handleDismissAlert: propTypes.func,
};

export default AlertSnackbar;
