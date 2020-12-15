import React, { useState, useEffect, useContext } from 'react';
import propTypes from 'prop-types';

import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Jumbotron from 'react-bootstrap/Jumbotron';
import { AlertContext } from '../../contexts/alert.context';

import { fetchAllLocationData } from '../../firebase/firebase.utils';

import MySpinner from '../my-spinner/my-spinner.component';
import FormSelect from '../form-select/form-select.component';

const SurveyDetailSection = ({
  handleChange,
  formValues,
  validationErrors,
}) => {
  const [alerts, setAlerts] = useContext(AlertContext);
  const [isLoading, setLoading] = useState(true);
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
      fetchAllLocationData()
        .then((locationArray) => {
          setLocations(locationArray);
          setLoading(false);
        })
        .catch((err) => {
          setAlerts((alertList) => [
            ...alertList,
            { type: 'fail', message: err.message },
          ]);
        });
    };
    fetchLocations();
  }, [setAlerts]);

  if (isLoading)
    return (
      <Form.Row>
        <Col>
          <Jumbotron className="bg-info text-white mb-2">
            <MySpinner />
          </Jumbotron>
        </Col>
      </Form.Row>
    );

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
