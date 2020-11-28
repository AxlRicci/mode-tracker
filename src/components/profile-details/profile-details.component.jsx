import React, { useState, useEffect } from 'react';
import propTypes from 'prop-types';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Spinner from 'react-bootstrap/Spinner';

import { fetchAllLocationData } from '../../firebase/firebase.utils';

import FormInput from '../form-input/form-input.component';
import FormSelect from '../form-select/form-select.component';

const ProfileDetails = ({
  additionalClasses,
  userProfile,
  handleChange,
  handleSubmit,
}) => {
  const [locations, setLocations] = useState([]);
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

  if (userProfile) {
    return (
      <Card className={`${additionalClasses}`}>
        <Card.Header>
          <Card.Title>
            <h1>Profile Details</h1>
          </Card.Title>
        </Card.Header>
        <Card.Body>
          <FormInput
            label="Display Name"
            name="displayName"
            handleChange={handleChange}
            value={userProfile.displayName}
          />
          <FormSelect
            name="location"
            label="School"
            handleChange={handleChange}
            value={userProfile.location}
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
            value={userProfile.grade}
            options={gradeOptions}
          />
          <Button type="button" onClick={handleSubmit}>
            Save Changes
          </Button>
        </Card.Body>
      </Card>
    );
  }
  return (
    <Spinner animation="border" role="status">
      <span className="sr-only">Loading...</span>
    </Spinner>
  );
};

ProfileDetails.propTypes = {
  additionalClasses: propTypes.string,
  userProfile: propTypes.object,
  handleChange: propTypes.func,
  handleSubmit: propTypes.func,
};

export default ProfileDetails;
