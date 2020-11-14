import React from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './custom-link.styles.scss';

const CustomLink = ({ additionalClasses, children, to, variant }) => {
  const version = variant ? `custom-link--${variant}` : null;
  return (
    <Link to={to} className={`custom-link ${additionalClasses} ${version}`}>
      {children}
    </Link>
  );
};

CustomLink.propTypes = {
  additionalClasses: propTypes.string,
  children: propTypes.string,
  to: propTypes.string,
  variant: propTypes.string,
};

export default CustomLink;
