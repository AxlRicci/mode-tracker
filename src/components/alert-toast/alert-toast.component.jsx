import React from 'react';
import propTypes from 'prop-types';

import Toast from 'react-bootstrap/Toast';
import './alert-toast.styles.css';

const AlertToast = ({ type, message, handleDismissAlert }) => {
  const variant = type === 'success' ? 'success' : 'danger';
  return (
    <Toast
      className="toast"
      onClose={handleDismissAlert}
      autohide
      delay={3000}
      animation
      aria-live="assertive"
      aria-atomic="true"
    >
      <Toast.Header className={`bg-${variant} text-white`} closeLabel="Close">
        <strong className="mr-auto">
          {variant === 'success' ? 'Success' : 'Error'}
        </strong>
      </Toast.Header>
      <Toast.Body>{message}</Toast.Body>
    </Toast>
  );
};

AlertToast.propTypes = {
  type: propTypes.string,
  message: propTypes.string,
  handleDismissAlert: propTypes.func,
};

export default AlertToast;
