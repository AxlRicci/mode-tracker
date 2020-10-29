import React, { useState } from 'react';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import './tracker-form.styles.scss';

const TrackerForm = () => {
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

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formValues);
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
