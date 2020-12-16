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
  <ButtonToolbar className="d-flex justify-content-md-end flex-column flex-md-row mt-4">
    <ButtonGroup className="mr-md-3 mb-3 mb-md-0">
      {step === 2 ? (
        <Button variant="danger" onClick={() => handleNavClick(1)}>
          Back
        </Button>
      ) : null}
      {step === 3 ? (
        <Button variant="secondary" onClick={() => handleNavClick(1)}>
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
        <Button variant="primary" onClick={() => handleNavClick(2)}>
          Next
        </Button>
      ) : null}
      {step === 3 ? (
        <Button
          variant="primary"
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
