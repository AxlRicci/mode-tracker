import React, { useState, useContext, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';

import { createNewSurveyDocument } from '../../firebase/firebase.utils';

import { UserContext } from '../../contexts/user.context';

import Survey from '../survey/survey.component';
import SurveyDetailSection from '../survey-detail-section/survey-detail-section.component';
import SurveyNavSection from '../survey-nav-section/survey-nav-section.component';
import SurveyListCard from '../survey-list-card/survey-list-card.component';

import './tracker-form.styles.scss';

const TrackerForm = () => {
  const currentUser = useContext(UserContext);
  const [step, setStep] = useState(1);
  const [survey, setSurvey] = useState();
  const [formValues, setFormValues] = useState({
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
  });

  useEffect(() => {
    setFormValues((fVals) => ({
      ...fVals,
      location: currentUser ? currentUser.location : '12232068545844200',
      grade: currentUser ? currentUser.grade : '1',
    }));
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
        ...formValues,
        data: {
          ...formValues.data,
          [name]: value,
        },
      });
    }
  };

  const handleNavClick = (stepNumber) => {
    setStep(stepNumber);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const surveyDocument = {
      location: formValues.location,
      grade: formValues.grade,
      data: {
        ...formValues.data,
      },
      user: currentUser ? currentUser.uid : 'anonymous',
      createdAt: Date.now(),
    };
    console.log('nowww');
    const surveyDoc = await createNewSurveyDocument(
      surveyDocument,
      currentUser
    );
    setFormValues({
      location: currentUser ? currentUser.location : '12232068545844200',
      grade: currentUser ? currentUser.grade : '1',
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
    });
    setSurvey(surveyDoc);
    setStep(3);
  };

  return (
    <Form>
      {step === 3 ? <SurveyListCard survey={survey} /> : null}
      {step !== 3 ? (
        <SurveyDetailSection
          handleChange={handleInputChange}
          formValues={formValues}
        />
      ) : null}
      <Form.Row>
        <Col>
          {step === 1 ? (
            <Survey
              handleInputChange={handleInputChange}
              formValues={formValues}
              text="to"
              value="tl"
            />
          ) : null}
          {step === 2 ? (
            <Survey
              handleInputChange={handleInputChange}
              formValues={formValues}
              text="from"
              value="fl"
            />
          ) : null}
        </Col>
      </Form.Row>
      <Form.Row>
        <Col>
          <SurveyNavSection
            handleNavClick={handleNavClick}
            handleSubmit={handleSubmit}
            step={step}
            locationId={formValues.location}
          />
        </Col>
      </Form.Row>
    </Form>
  );
};

export default TrackerForm;
