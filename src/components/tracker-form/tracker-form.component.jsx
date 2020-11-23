import React, { useState, useContext, useEffect } from 'react';
import propTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Jumbotron from 'react-bootstrap/Jumbotron';
import { createNewSurveyDocument } from '../../firebase/firebase.utils';

import { UserContext } from '../../contexts/user.context';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import LocationPicker from '../location-picker/location-picker.component';
import GradePicker from '../grade-picker/grade-picker.component';

import './tracker-form.styles.scss';

const TrackerForm = () => {
  const currentUser = useContext(UserContext);
  const [step, setStep] = useState(1);
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
    if (currentUser) {
      setFormValues({
        ...formValues,
        location: currentUser.location,
        grade: currentUser.grade,
      });
    }
  }, [currentUser]);

  const handleInputChange = (event) => {
    console.log(event);
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    const surveyDocument = {
      location: formValues.location,
      grade: formValues.grade,
      data: {
        ...formValues.data,
      },
      user: currentUser.uid,
      createdAt: new Date(),
    };
    createNewSurveyDocument(surveyDocument, currentUser);
    setFormValues({
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
  };

  const Survey = ({ text, value }) => (
    <ListGroup>
      <ListGroup.Item variant="success">
        <Row className="d-flex">
          <Col xs={12} sm={9}>
            <div className="d-flex flex-column">
              <h5>Who biked {text} school today?</h5>
              <p>All or most of the way.</p>
            </div>
          </Col>
          <Col xs={12} sm={3}>
            <FormInput
              type="number"
              handleChange={handleInputChange}
              name={`${value}Bike`}
              value={formValues.data[`${value}Bike`]}
            />
          </Col>
        </Row>
      </ListGroup.Item>
      <ListGroup.Item variant="primary">
        <Row>
          <Col xs={12} sm={9}>
            <div className="d-flex flex-column">
              <h5>Who walked {text} school today?</h5>
              <p>All or most of the way.</p>
            </div>
          </Col>
          <Col xs={12} sm={3}>
            <FormInput
              type="number"
              handleChange={handleInputChange}
              name={`${value}Walk`}
              value={formValues.data[`${value}Walk`]}
            />
          </Col>
        </Row>
      </ListGroup.Item>
      <ListGroup.Item variant="info">
        <Row>
          <Col xs={12} sm={9}>
            <div className="d-flex flex-column">
              <h5>Who rolled {text} school today?</h5>
              <p>This includes skateboards, wheelchairs, scooters, etc.</p>
            </div>
          </Col>
          <Col xs={12} sm={3}>
            <FormInput
              type="number"
              handleChange={handleInputChange}
              name={`${value}Roll`}
              value={formValues.data[`${value}Roll`]}
            />
          </Col>
        </Row>
      </ListGroup.Item>
      <ListGroup.Item variant="secondary">
        <Row>
          <Col xs={12} sm={9}>
            <div className="d-flex flex-column">
              <h5>Who rode public transit {text} school today?</h5>
              <p>
                All or most of the way. Includes trains, ferries, busses, etc.
              </p>
            </div>
          </Col>
          <Col xs={12} sm={3}>
            <FormInput
              type="number"
              handleChange={handleInputChange}
              name={`${value}PublicTrans`}
              value={formValues.data[[`${value}PublicTrans`]]}
            />
          </Col>
        </Row>
      </ListGroup.Item>
      <ListGroup.Item variant="warning">
        <Row>
          <Col xs={12} sm={9}>
            <div className="d-flex flex-column">
              <h5>Who rode a schoolbus {text} school today?</h5>
              <p>This includes any shared vehicles for students only.</p>
            </div>
          </Col>
          <Col xs={12} sm={3}>
            <FormInput
              type="number"
              handleChange={handleInputChange}
              name={`${value}Schoolbus`}
              value={formValues.data[`${value}Schoolbus`]}
            />
          </Col>
        </Row>
      </ListGroup.Item>
      <ListGroup.Item variant="danger">
        <Row>
          <Col xs={12} sm={9}>
            <div className="d-flex flex-column">
              <h5>Who rode in a car {text} school today?</h5>
              <p>This includes taxis.</p>
            </div>
          </Col>
          <Col xs={12} sm={3}>
            <FormInput
              type="number"
              handleChange={handleInputChange}
              name={`${value}Car`}
              value={formValues.data[`${value}Car`]}
            />
          </Col>
        </Row>
      </ListGroup.Item>
    </ListGroup>
  );

  Survey.propTypes = {
    text: propTypes.string,
    value: propTypes.string,
  };

  return (
    <Form>
      <Form.Row>
        <Col>
          <Jumbotron fluid>
            <LocationPicker
              name="location"
              handleChange={handleInputChange}
              value={formValues.location}
            />
            <GradePicker
              handleChange={handleInputChange}
              value={formValues.grade}
            />
          </Jumbotron>
        </Col>
      </Form.Row>
      <Form.Row>
        <Col>
          {step === 1 ? <Survey text="to" value="tl" /> : null}
          {step === 2 ? <Survey text="from" value="fl" /> : null}
          <ButtonToolbar className="d-flex justify-content-end mt-3">
            <ButtonGroup className="mr-3">
              {step !== 1 ? (
                <Button variant="danger" onClick={() => setStep(1)}>
                  Back
                </Button>
              ) : null}
            </ButtonGroup>
            <ButtonGroup>
              <Button variant="success" onClick={() => setStep(2)}>
                Next
              </Button>
            </ButtonGroup>
          </ButtonToolbar>
        </Col>
      </Form.Row>
      <CustomButton handleClick={handleSubmit} type="submit" label="submit" />
    </Form>
  );
};

export default TrackerForm;
