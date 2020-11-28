import React from 'react';
import propTypes from 'prop-types';
import ListGroup from 'react-bootstrap/ListGroup';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import FormInput from '../form-input/form-input.component';

const Survey = ({ handleInputChange, formValues, text, value }) => (
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
            min={0}
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
            min={0}
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
            min={0}
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
            min={0}
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
            min={0}
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
            min={0}
          />
        </Col>
      </Row>
    </ListGroup.Item>
  </ListGroup>
);

Survey.propTypes = {
  formValues: propTypes.object,
  text: propTypes.string,
  value: propTypes.string,
  handleInputChange: propTypes.func,
};

export default Survey;
