import React from 'react';
import propTypes from 'prop-types';

import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';

import './form-input.styles.scss';

const FormInput = ({
  description,
  handleChange,
  label,
  name,
  placeholder,
  type,
  value,
  min,
  max,
  xs,
  sm,
  md,
  lg,
  xl,
}) => (
  <Form.Group
    as={Col}
    xs={xs}
    sm={sm}
    md={md}
    lg={lg}
    xl={xl}
    controlId={name}
    className="pl-0"
  >
    <Form.Label>{label}</Form.Label>
    <Form.Control
      name={name}
      onChange={handleChange}
      value={value}
      type={type}
      placeholder={placeholder || null}
      min={min}
      max={max}
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
  type: propTypes.string,
  value: propTypes.oneOfType([propTypes.string, propTypes.number]),
  min: propTypes.number,
  max: propTypes.number,
  xs: propTypes.object,
  sm: propTypes.object,
  md: propTypes.object,
  lg: propTypes.object,
  xl: propTypes.object,
};

export default FormInput;
