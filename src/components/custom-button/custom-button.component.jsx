import React from 'react';
import propTypes from 'prop-types';

import './custom-button.styles.scss';

const CustomButton = ({ additionalClasses, handleClick, label, type }) => (
  <button
    className={`custom-button ${additionalClasses}`}
    onClick={handleClick}
    type={type === 'submit' ? 'submit' : 'button'}
  >
    {label}
  </button>
);

CustomButton.propTypes = {
  additionalClasses: propTypes.string,
  type: propTypes.string,
  handleClick: propTypes.func,
  label: propTypes.string,
};

export default CustomButton;
