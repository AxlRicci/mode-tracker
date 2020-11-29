import React from 'react';
import { withRouter } from 'react-router-dom';
import propTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';

const SurveyNavSection = ({
  handleSubmit,
  handleNavClick,
  step,
  history,
  locationId,
}) => (
  <ButtonToolbar className="d-flex justify-content-end mt-3">
    <ButtonGroup className="mr-3">
      {step === 2 ? (
        <Button variant="danger" onClick={() => handleNavClick(1)}>
          Back
        </Button>
      ) : null}
      {step === 3 ? (
        <Button variant="info" onClick={() => handleNavClick(1)}>
          Start Another Survey
        </Button>
      ) : null}
    </ButtonGroup>
    <ButtonGroup>
      {step === 2 ? (
        <Button variant="success" onClick={handleSubmit}>
          Submit
        </Button>
      ) : null}
      {step === 1 ? (
        <Button variant="info" onClick={() => handleNavClick(2)}>
          Next
        </Button>
      ) : null}
      {step === 3 ? (
        <Button
          variant="success"
          onClick={() => history.push(`/location/${locationId}`)}
        >
          Back to Location Page
        </Button>
      ) : null}
    </ButtonGroup>
  </ButtonToolbar>
);

SurveyNavSection.propTypes = {
  handleSubmit: propTypes.func,
  handleNavClick: propTypes.func,
  step: propTypes.number,
  history: propTypes.object,
  locationId: propTypes.string,
};

export default withRouter(SurveyNavSection);
