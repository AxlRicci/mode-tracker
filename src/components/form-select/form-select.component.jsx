import React from 'react';
import propTypes from 'prop-types';

import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';

const FormSelect = ({
  description,
  handleChange,
  label,
  name,
  options,
  optionKey,
  optionValue,
  optionLabelMain,
  optionLabelDesc,
  placeholder,
  type,
  value,
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
      as="select"
      name={name}
      onChange={handleChange}
      value={value}
      type={type}
      placeholder={placeholder || null}
    >
      {options.map((option, idx) => {
        if (value === option || value === optionValue) {
          return (
            <option
              key={option[optionKey] || idx}
              value={option[optionValue] || option}
              selected
            >
              {optionLabelMain || optionLabelDesc
                ? `${option[optionLabelMain]} - ${option[optionLabelDesc]}`
                : option}
            </option>
          );
        }
        return (
          <option
            key={option[optionKey] || idx}
            value={option[optionValue] || option}
          >
            {optionLabelMain || optionLabelDesc
              ? `${option[optionLabelMain]} - ${option[optionLabelDesc]}`
              : option}
          </option>
        );
      })}
    </Form.Control>
    {description ? (
      <Form.Text className="text-muted">{description}</Form.Text>
    ) : null}
  </Form.Group>
);

FormSelect.propTypes = {
  description: propTypes.string,
  handleChange: propTypes.func,
  label: propTypes.string,
  name: propTypes.string,
  options: propTypes.array,
  optionKey: propTypes.string,
  optionValue: propTypes.string,
  optionLabelMain: propTypes.string,
  optionLabelDesc: propTypes.string,
  placeholder: propTypes.string,
  type: propTypes.string,
  value: propTypes.string,
  xs: propTypes.object,
  sm: propTypes.object,
  md: propTypes.object,
  lg: propTypes.object,
  xl: propTypes.object,
};

export default FormSelect;
