import React from 'react';
import { updateSurveyData } from '../../firebase/firebase.utils';

const TestButton = () => {
  const testData = {};

  return (
    <button
      onClick={() =>
        updateSurveyData('123', {
          name: 'bike',
          direction: 'to',
          value: 60,
        })
      }
      type="button"
    >
      TEST BUTTON
    </button>
  );
};

export default TestButton;
