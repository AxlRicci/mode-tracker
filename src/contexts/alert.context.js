import React, { createContext } from 'react';
import propTypes from 'prop-types';

export const AlertContext = createContext();

export const AlertProvider = ({ alerts, children }) => (
  <AlertContext.Provider value={alerts}>{children}</AlertContext.Provider>
);

AlertProvider.propTypes = {
  alerts: propTypes.array,
  children: propTypes.element,
};
