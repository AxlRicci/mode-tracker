import React, { useState, useEffect } from 'react';
import propTypes from 'prop-types';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Jumbotron from 'react-bootstrap/Jumbotron';
import { fetchAllLocationData } from '../../firebase/firebase.utils';

import FormSelect from '../form-select/form-select.component';

const SurveyDetailSection = ({ handleChange, formValues }) => {
  const [locations, setLocations] = useState(['loading...']);
  const gradeOptions = [
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

  useEffect(() => {
    const fetchLocations = async () => {
      const locationArray = await fetchAllLocationData();
      setLocations(locationArray);
    };
    fetchLocations();
  });

  return (
    <Form.Row>
      <Col>
        <Jumbotron>
          <h4 className="mb-3 pl-3">
            What school and grade is this survey for?
          </h4>
          <FormSelect
            name="location"
            label="School"
            handleChange={handleChange}
            value={formValues.location}
            options={locations}
            optionKey="locationId"
            optionValue="locationId"
            optionLabelMain="locationName"
            optionLabelDesc="locationAddress"
          />
          <FormSelect
            name="grade"
            label="Grade"
            handleChange={handleChange}
            value={formValues.grade || '1'}
            options={gradeOptions}
          />
        </Jumbotron>
      </Col>
    </Form.Row>
  );
};

SurveyDetailSection.propTypes = {
  formValues: propTypes.object,
  handleChange: propTypes.func,
};

export default SurveyDetailSection;
