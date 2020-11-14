import React from 'react';
import propTypes from 'prop-types';

const GradePicker = ({ handleChange, value }) => {
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

  return (
    <div className="grade-picker">
      <label htmlFor="grade-select">
        Grade:
        <select onChange={handleChange} name="grade" id="grade-select">
          {gradeOptions.map((option) => {
            if (value === option) {
              return (
                <option key={option} value={option} selected>
                  {option}
                </option>
              );
            }
            return (
              <option key={option} value={option}>
                {option}
              </option>
            );
          })}
        </select>
      </label>
    </div>
  );
};

GradePicker.propTypes = {
  handleChange: propTypes.func,
  value: propTypes.string,
};

export default GradePicker;
