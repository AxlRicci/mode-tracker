import React, { useState, useContext } from 'react';
import { firestore } from '../../firebase/firebase.utils';

import { UserContext } from '../../contexts/user.context';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import './tracker-form.styles.scss';

const TrackerForm = () => {
  const currentUser = useContext(UserContext);
  const [formValues, setFormValues] = useState({
    bike: '',
    walk: '',
    roll: '',
    publicTrans: '',
    schoolBus: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const surveyDocument = {
      ...formValues,
      user: currentUser.uid,
    };
    await firestore.collection('/locations').doc().set(surveyDocument);
    setFormValues({
      bike: '',
      walk: '',
      roll: '',
      publicTrans: '',
      schoolBus: '',
    });
  };

  return (
    <div className="tracker-form">
      <form>
        <FormInput
          handleChange={handleChange}
          name="bike"
          label="Bike"
          value={formValues.bike}
        />
        <FormInput
          handleChange={handleChange}
          name="walk"
          label="Walk"
          value={formValues.walk}
        />
        <FormInput
          handleChange={handleChange}
          name="roll"
          label="Roll"
          value={formValues.roll}
        />
        <FormInput
          handleChange={handleChange}
          name="publicTrans"
          label="publicTrans"
          value={formValues.publicTrans}
        />
        <FormInput
          handleChange={handleChange}
          name="schoolBus"
          label="schoolBus"
          value={formValues.schoolBus}
        />
        <CustomButton handleClick={handleSubmit} type="submit" label="submit" />
      </form>
    </div>
  );
};

export default TrackerForm;
