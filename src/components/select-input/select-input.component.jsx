import React from 'react';
import propTypes from 'prop-types';

import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';

const SelectInput = ({
  handleChange,
  label,
  name,
  type,
  xs,
  sm,
  md,
  lg,
  xl,
}) => {
  const grade = [
    '1',
    '1-2',
    '2',
    '2-3',
    '3',
    '3-4',
    '4',
    '4-5',
    '5',
    '5-6',
    '6',
    '6-7',
    '7',
    '7-8',
    '8',
    '9',
    '10',
    '11',
    '12',
  ];
  const locationType = ['school', 'workplace'];
  let selected = [];

  if (type === 'grade') {
    selected = grade;
  } else if (type === 'location') {
    selected = locationType;
  }

  return (
    <Form.Group
      as={Col}
      xs={xs}
      sm={sm}
      md={md}
      lg={lg}
      xl={xl}
      controlId={name}
    >
      <Form.Label>{label}</Form.Label>
      <Form.Control onChange={handleChange} as="select">
        {selected.map((option) => (
          <option>{option}</option>
        ))}
      </Form.Control>
    </Form.Group>
  );
};

SelectInput.propTypes = {
  handleChange: propTypes.func,
  label: propTypes.string,
  name: propTypes.string,
  type: propTypes.string,
  xs: propTypes.object,
  sm: propTypes.object,
  md: propTypes.object,
  lg: propTypes.object,
  xl: propTypes.object,
};

export default SelectInput;
