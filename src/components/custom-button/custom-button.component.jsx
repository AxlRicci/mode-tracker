import React from 'react';
import propTypes from 'prop-types';

import './custom-button.styles.scss';

const CustomButton = ({
  additionalClasses,
  handleClick,
  type,
  children,
  variant,
}) => {
  const version = variant ? `custom-button--${variant}` : null;
  return (
    <button
      className={`custom-button ${additionalClasses} ${version}`}
      onClick={handleClick}
      type={type === 'submit' ? 'submit' : 'button'}
    >
      {children}
    </button>
  );
};

CustomButton.propTypes = {
  additionalClasses: propTypes.string,
  type: propTypes.string,
  handleClick: propTypes.func,
  children: propTypes.string,
  variant: propTypes.string,
};

export default CustomButton;
