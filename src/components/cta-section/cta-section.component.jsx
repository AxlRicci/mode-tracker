import React from 'react';
import propTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Row from 'react-bootstrap/Row';

const CtaSection = ({ heading, subheading, buttonLabel, history }) => (
  <Jumbotron className="bg-primary text-white mt-5">
    <Row className="align-items-center justify-content-center" noGutters>
      <Col xs={12} md={8} className="text-center text-md-left">
        <h1 className="display-4">{heading}</h1>
        <p className="lead">{subheading}</p>
      </Col>
      <Col className="d-flex justify-content-center" xs={12} md={4}>
        <Button
          onClick={() => history.push('/survey')}
          variant="outline-light"
          className="btn-lg"
        >
          {buttonLabel}
        </Button>
      </Col>
    </Row>
  </Jumbotron>
);

CtaSection.propTypes = {
  heading: propTypes.string,
  subheading: propTypes.string,
  buttonLabel: propTypes.string,
  history: propTypes.object,
};

export default withRouter(CtaSection);
