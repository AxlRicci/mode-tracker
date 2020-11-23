import React from 'react';
import propTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';

const SurveyNavSection = ({ handleSubmit, handleNavClick, step }) => (
  <ButtonToolbar className="d-flex justify-content-end mt-3">
    <ButtonGroup className="mr-3">
      {step !== 1 ? (
        <Button variant="danger" onClick={() => handleNavClick(1)}>
          Back
        </Button>
      ) : null}
    </ButtonGroup>
    <ButtonGroup>
      {step === 2 ? (
        <Button variant="success" onClick={handleSubmit}>
          Submit
        </Button>
      ) : (
        <Button variant="primary" onClick={() => handleNavClick(2)}>
          Next
        </Button>
      )}
    </ButtonGroup>
  </ButtonToolbar>
);

SurveyNavSection.propTypes = {
  handleSubmit: propTypes.func,
  handleNavClick: propTypes.func,
  step: propTypes.number,
};

export default SurveyNavSection;
