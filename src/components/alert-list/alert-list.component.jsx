import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import Toast from 'react-bootstrap/Toast';

import AlertToast from '../alert-toast/alert-toast.component';

import './alert-list.styles.css';

const AlertList = ({ alerts, handleDismissAlert }) => {
  const [alertList, setAlertList] = useState(alerts);
  useEffect(() => {
    setAlertList(alerts);
  }, [alerts]);

  return (
    <div className="toast-list position-fixed">
      {alertList.map((alert, idx) => {
        const { type, message } = alert;
        return (
          <AlertToast
            key={idx}
            type={type}
            message={message}
            handleDismissAlert={() => handleDismissAlert(idx)}
          />
        );
      })}
    </div>
  );
};

AlertList.propTypes = {
  alerts: propTypes.array,
  handleDismissAlert: propTypes.func,
};

export default AlertList;
