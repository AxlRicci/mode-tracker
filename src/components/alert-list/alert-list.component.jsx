import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';

import AlertSnackbar from '../alert-snackbar/alert-snackbar.component';

const AlertList = ({ alerts, handleDismissAlert }) => {
  const [alertList, setAlertList] = useState(alerts);
  useEffect(() => {
    setAlertList(alerts);
  }, [alerts]);

  return (
    <div>
      {alertList.map((alert, idx) => {
        const { type, message } = alert;
        return (
          <AlertSnackbar
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
