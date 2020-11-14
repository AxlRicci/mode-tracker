import React from 'react';
import propTypes from 'prop-types';

import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';

import './form-input.styles.scss';

const FormInput = ({
  reassign,
  description,
  handleChange,
  label,
  name,
  placeholder,
  type,
  value,
}) => (
  <Form.Group as={Col} controlId={name}>
    <Form.Label>{label}</Form.Label>
    <Form.Control
      onChange={handleChange}
      value={value}
      type={type}
      placeholder={placeholder || null}
    />
    {description ? (
      <Form.Text className="text-muted">{description}</Form.Text>
    ) : null}
  </Form.Group>
);

FormInput.propTypes = {
  description: propTypes.string,
  handleChange: propTypes.func,
  label: propTypes.string,
  name: propTypes.string,
  placeholder: propTypes.string,
  reassign: propTypes.string,
  type: propTypes.string,
  value: propTypes.string,
};

export default FormInput;

// <div className="input-group">
//     <label htmlFor={name}>{label}</label>
//     <input onChange={handleChange} name={name} type={type} value={value} />
//   </div>
