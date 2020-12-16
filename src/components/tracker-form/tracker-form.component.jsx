import React, { useState, useContext, useEffect } from 'react';
import propTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Jumbotron from 'react-bootstrap/Jumbotron';

import { createNewSurveyDocument } from '../../firebase/firebase.utils';
import { trackerFormValidation } from './tracker-form-validation.component';

import { AlertContext } from '../../contexts/alert.context';
import { UserContext } from '../../contexts/user.context';

import Survey from '../survey/survey.component';
import SurveyDetailSection from '../survey-detail-section/survey-detail-section.component';
import SurveyNavSection from '../survey-nav-section/survey-nav-section.component';
import SurveyList from '../survey-list/survey-list.component';

import './tracker-form.styles.scss';

const initialFormValues = {
  location: '',
  grade: '',
  data: {
    tlBike: 0,
    tlWalk: 0,
    tlRoll: 0,
    tlSchoolbus: 0,
    tlPublicTrans: 0,
    tlCar: 0,
    flBike: 0,
    flWalk: 0,
    flRoll: 0,
    flSchoolbus: 0,
    flPublicTrans: 0,
    flCar: 0,
  },
};

const initialErrorValues = {
  locationError: '',
  gradeError: '',
  dataError: {
    tlBikeError: '',
    tlWalkError: '',
    tlRollError: '',
    tlSchoolbusError: '',
    tlPublicTransError: '',
    tlCarError: '',
    flBikeError: '',
    flWalkError: '',
    flRollError: '',
    flSchoolbusError: '',
    flPublicTransError: '',
    flCarError: '',
  },
};

const TrackerForm = ({ location }) => {
  const [currentUser, setCurrentUser] = useContext(UserContext);
  const [alerts, setAlerts] = useContext(AlertContext);
  const [step, setStep] = useState(1);
  const [survey, setSurvey] = useState();
  const [formValues, setFormValues] = useState(initialFormValues);
  const [validationErrors, setValidationErrors] = useState(initialErrorValues);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    setFormValues((fVals) => ({
      ...fVals,
      location: currentUser ? currentUser.location : '12232068545844200',
      grade: currentUser ? currentUser.grade : '5',
    }));

    // Check location state to see if user is being routed with "Do survey at.." button on a location page.
    if (location.state) {
      setFormValues((fvals) => ({
        ...fvals,
        location: location.state.incomingLocation,
      }));
    }
    setSubmitted(false);
  }, [currentUser, location.state, submitted]);

  const handleInputChange = (event) => {
    const { name, value, type } = event.target;
    if (name === 'location' || name === 'grade') {
      setFormValues({
        ...formValues,
        [name]: value,
      });
    } else {
      setFormValues({
        ...formValues,
        data: {
          ...formValues.data,
          [name]: type === 'number' ? parseInt(value) : value,
        },
      });
    }
  };

  const handleNavClick = (stepNumber) => {
    setStep(stepNumber);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Format form fields and add user and date.
    const surveyDocument = {
      location: formValues.location,
      grade: formValues.grade,
      data: {
        ...formValues.data,
      },
      user: currentUser ? currentUser.uid : 'anonymous',
      createdAt: Date.now(),
    };

    // Validate form. Will return false (no errors) or an object with fields and error messages.
    const validationErrorList = trackerFormValidation(surveyDocument);
    setValidationErrors(validationErrorList);

    if (validationErrorList) {
      // Determine where in the survey the error is.
      const toError = !Object.keys(validationErrorList).some((key) =>
        key.indexOf('tl')
      );
      const fromError = !Object.keys(validationErrorList).some((key) =>
        key.indexOf('fl')
      );

      const locationError = !Object.keys(validationErrorList).some((key) =>
        key.indexOf('location')
      );

      const gradeError = !Object.keys(validationErrorList).some((key) =>
        key.indexOf('grade')
      );

      // Move the user to the section of the survey that has the error.
      if (toError) {
        setStep(1); // sends back to first survey page to fix to location field error
      } else if (fromError) {
        setStep(2); // keeps user on second page to fix from location field error
      } else if (locationError || gradeError) {
        window.scrollTo({ top: 0, behavior: 'smooth' }); // scrolls to top to fix location or grade error.
      }
    }

    // check if form is valid and submit.
    if (!validationErrorList) {
      createNewSurveyDocument(surveyDocument, currentUser)
        .then((surveyDoc) => {
          setFormValues(initialFormValues);
          setSurvey(surveyDoc);
          setAlerts([
            ...alerts,
            {
              type: 'success',
              message: 'Successfully submitted survey!',
            },
          ]);
          setStep(3);
          setSubmitted(true);
        })
        .catch((err) => {
          setAlerts([...alerts, { type: 'fail', message: err.message }]);
        });
    }
  };

  return (
    <Form>
      {step === 3 ? (
        <Jumbotron>
          <h1 className="display-4 mb-5">Survey Results</h1>
          <SurveyList
            query={{ field: 'surveyId', value: survey.surveyId }}
            editable
          />
        </Jumbotron>
      ) : null}
      {step !== 3 ? (
        <SurveyDetailSection
          handleChange={handleInputChange}
          formValues={formValues}
          validationErrors={validationErrors}
        />
      ) : null}
      <Form.Row>
        <Col>
          {step === 1 ? (
            <>
              <Jumbotron className="p-3 mb-2">
                <h4>
                  Part 1: Ask students how they travelled <strong>TO</strong>{' '}
                  school.
                </h4>
              </Jumbotron>
              <Survey
                handleInputChange={handleInputChange}
                formValues={formValues}
                text="to"
                value="tl"
                validationErrors={validationErrors}
              />
            </>
          ) : null}
          {step === 2 ? (
            <>
              <Jumbotron className="p-3 mb-2">
                <h4>
                  Part 2: Ask students how they <strong>will</strong> travel
                  home <strong>FROM</strong> school today
                </h4>
              </Jumbotron>
              <Survey
                handleInputChange={handleInputChange}
                formValues={formValues}
                text="from"
                value="fl"
                validationErrors={validationErrors}
              />
            </>
          ) : null}
        </Col>
      </Form.Row>
      <Form.Row>
        <Col>
          <SurveyNavSection
            handleNavClick={handleNavClick}
            handleSubmit={handleSubmit}
            step={step}
            locationId={survey ? survey.location : formValues.location}
          />
        </Col>
      </Form.Row>
    </Form>
  );
};

TrackerForm.propTypes = {
  location: propTypes.object,
};

export default withRouter(TrackerForm);
