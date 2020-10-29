import React from 'react';
import propTypes from 'prop-types';

import './form-input.styles.scss';

const FormInput = ({ handleChange, label, name, type, value }) => (
  <div className="input-group">
    <label htmlFor={name}>{label}</label>
    <input onChange={handleChange} name={name} type={type} value={value} />
  </div>
);

FormInput.propTypes = {
  handleChange: propTypes.func,
  label: propTypes.string,
  name: propTypes.string,
  type: propTypes.string,
  value: propTypes.string,
};

export default FormInput;
