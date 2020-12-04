import React, { useState, useEffect } from 'react';
import propTypes from 'prop-types';

import Button from 'react-bootstrap/Button';
import Jumbotron from 'react-bootstrap/Jumbotron';

import { fetchAllLocationData } from '../../firebase/firebase.utils';

import MySpinner from '../my-spinner/my-spinner.component';
import FormInput from '../form-input/form-input.component';
import FormSelect from '../form-select/form-select.component';

const ProfileDetails = ({
  additionalClasses,
  userProfile,
  handleChange,
  handleSubmit,
}) => {
  const [isLoading, setLoading] = useState(true);
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
      setLoading(false);
    };
    fetchLocations();
  }, []);

  // If locations are fetching show loading spinner instead of empty input fields
  if (isLoading)
    return (
      <Jumbotron className={`bg-info text-white ${additionalClasses}`}>
        <h1 className="text-center text-md-left display-4">Profile Details</h1>
        <p className="lead text-center text-md-left">
          Information added from your profile will be saved as defaults for
          travel mode surveys.
        </p>
        <MySpinner />
      </Jumbotron>
    );

  return (
    <Jumbotron className={`bg-info text-white ${additionalClasses}`}>
      <h1 className="text-center text-md-left display-4">Profile Details</h1>
      <p className="lead text-center text-md-left">
        Information added from your profile will be saved as defaults for travel
        mode surveys.
      </p>
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
      <div className="d-flex justify-content-center justify-content-md-start">
        <Button variant="outline-light" onClick={handleSubmit}>
          Save Changes
        </Button>
      </div>
    </Jumbotron>
  );
};

ProfileDetails.propTypes = {
  additionalClasses: propTypes.string,
  userProfile: propTypes.object,
  handleChange: propTypes.func,
  handleSubmit: propTypes.func,
};

export default ProfileDetails;
