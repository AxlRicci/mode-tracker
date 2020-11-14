import React, { useState, useContext, useEffect } from 'react';
import { createNewSurveyDocument } from '../../firebase/firebase.utils';

import { UserContext } from '../../contexts/user.context';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import LocationPicker from '../location-picker/location-picker.component';
import GradePicker from '../grade-picker/grade-picker.component';

import './tracker-form.styles.scss';

const TrackerForm = () => {
  const currentUser = useContext(UserContext);
  const [formValues, setFormValues] = useState({
    location: '',
    grade: '',
    surveyData: {
      tlBike: '',
      tlWalk: '',
      tlRoll: '',
      tlPublicTrans: '',
      tlSchoolBus: '',
      tlCar: '',
      flBike: '',
      flWalk: '',
      flRoll: '',
      flPublicTrans: '',
      flSchoolBus: '',
      flCar: '',
    },
  });

  useEffect(() => {
    if (currentUser) {
      setFormValues({
        ...formValues,
        location: currentUser.location,
        grade: currentUser.grade,
      });
    }
  }, [currentUser]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === 'location' || name === 'grade') {
      setFormValues({
        ...formValues,
        [name]: value,
      });
    } else {
      setFormValues({
        surveyData: {
          ...formValues.surveyData,
          [name]: value,
        },
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const surveyDocument = {
      location: formValues.location,
      grade: formValues.grade,
      data: {
        ...formValues.surveyData,
      },
      user: currentUser.uid,
      createdAt: new Date(),
    };
    createNewSurveyDocument(surveyDocument, currentUser);
    setFormValues({
      location: '',
      grade: '',
      surveyData: {
        tlBike: '',
        tlWalk: '',
        tlRoll: '',
        tlPublicTrans: '',
        tlSchoolBus: '',
        tlCar: '',
        flBike: '',
        flWalk: '',
        flRoll: '',
        flPublicTrans: '',
        flSchoolBus: '',
        flCar: '',
      },
    });
  };

  return (
    <div className="tracker-form">
      <form>
        <LocationPicker
          name="location"
          handleChange={handleInputChange}
          value={formValues.location}
        />
        <GradePicker
          handleChange={handleInputChange}
          value={formValues.grade}
        />
        <div className="tracker-form__to-school">
          <h3 className="tracker-form__section-heading">TO SCHOOL</h3>
          <FormInput
            handleChange={handleInputChange}
            name="tlBike"
            label="Bike"
            value={formValues.tlBike}
          />
          <FormInput
            handleChange={handleInputChange}
            name="tlWalk"
            label="Walk"
            value={formValues.tlWalk}
          />
          <FormInput
            handleChange={handleInputChange}
            name="tlRoll"
            label="Roll"
            value={formValues.tlRoll}
          />
          <FormInput
            handleChange={handleInputChange}
            name="tlPublicTrans"
            label="publicTrans"
            value={formValues.tlPublicTrans}
          />
          <FormInput
            handleChange={handleInputChange}
            name="tlSchoolBus"
            label="schoolBus"
            value={formValues.tlSchoolBus}
          />
          <FormInput
            handleChange={handleInputChange}
            name="tlCar"
            label="Car"
            value={formValues.tlCar}
          />
        </div>
        <div className="tracker-form__to-school">
          <h3 className="tracker-form__section-heading">FROM SCHOOL</h3>
          <FormInput
            handleChange={handleInputChange}
            name="flBike"
            label="Bike"
            value={formValues.flBike}
          />
          <FormInput
            handleChange={handleInputChange}
            name="flWalk"
            label="Walk"
            value={formValues.flWalk}
          />
          <FormInput
            handleChange={handleInputChange}
            name="flRoll"
            label="Roll"
            value={formValues.flRoll}
          />
          <FormInput
            handleChange={handleInputChange}
            name="flPublicTrans"
            label="publicTrans"
            value={formValues.flPublicTrans}
          />
          <FormInput
            handleChange={handleInputChange}
            name="flSchoolBus"
            label="schoolBus"
            value={formValues.flSchoolBus}
          />
          <FormInput
            handleChange={handleInputChange}
            name="flCar"
            label="Car"
            value={formValues.flCar}
          />
        </div>
        <CustomButton handleClick={handleSubmit} type="submit" label="submit" />
      </form>
    </div>
  );
};

export default TrackerForm;
