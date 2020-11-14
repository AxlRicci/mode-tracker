import React, { useContext, useState, useEffect } from 'react';
import { updateUserDocument } from '../../firebase/firebase.utils';

import { UserContext } from '../../contexts/user.context';

import FormInput from '../../components/form-input/form-input.component';
import GradePicker from '../../components/grade-picker/grade-picker.component';
import LocationPicker from '../../components/location-picker/location-picker.component';

import './profile-page.styles.scss';

const ProfilePage = () => {
  const user = useContext(UserContext);
  const [userProfile, setUserProfile] = useState({
    displayName: '',
    location: '',
    grade: [],
  });

  useEffect(() => {
    if (user) {
      setUserProfile({
        displayName: user.displayName,
        location: user.location,
        grade: user.grade,
      });
    }
  }, [user]);

  const handleFormInputChange = (event) => {
    const { name, value } = event.target;
    setUserProfile({
      ...userProfile,
      [name]: value,
    });
  };

  const handlePickerChange = (event) => {
    const { name, value } = event.target;
    setUserProfile({
      ...userProfile,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    updateUserDocument(user.uid, userProfile);
  };

  if (userProfile) {
    return (
      <div className="profile-page">
        <FormInput
          label="Display Name"
          name="displayName"
          handleChange={handleFormInputChange}
          value={userProfile.displayName}
        />
        <LocationPicker
          value={userProfile.location}
          handleChange={handlePickerChange}
        />
        <GradePicker
          value={userProfile.grades}
          handleChange={handlePickerChange}
        />
        <button type="button" onClick={handleSubmit}>
          Save
        </button>
      </div>
    );
  }
  return (
    <div className="profile-page">
      <h1>loading...</h1>
    </div>
  );
};

export default ProfilePage;
