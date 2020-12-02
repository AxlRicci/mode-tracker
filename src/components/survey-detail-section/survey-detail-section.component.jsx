import React, { useState, useEffect } from 'react';
import propTypes from 'prop-types';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Jumbotron from 'react-bootstrap/Jumbotron';
import { PortraitSharp } from '@material-ui/icons';
import { fetchAllLocationData } from '../../firebase/firebase.utils';

import FormSelect from '../form-select/form-select.component';

const SurveyDetailSection = ({
  handleChange,
  formValues,
  validationErrors,
}) => {
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
  }, []);

  return (
    <Form.Row>
      <Col>
        <Jumbotron className="bg-info text-white mb-2">
          <h4 className="mb-3">What school and grade is this survey for?</h4>
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
            error={validationErrors.locationError}
          />
          <FormSelect
            name="grade"
            label="Grade"
            handleChange={handleChange}
            value={formValues.grade || '1'}
            options={gradeOptions}
            error={validationErrors.gradeError}
          />
        </Jumbotron>
      </Col>
    </Form.Row>
  );
};

SurveyDetailSection.propTypes = {
  formValues: propTypes.object,
  handleChange: propTypes.func,
  validationErrors: propTypes.object,
};

export default SurveyDetailSection;
