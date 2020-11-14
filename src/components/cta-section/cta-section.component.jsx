import React from 'react';
import propTypes from 'prop-types';

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Row from 'react-bootstrap/Row';

const CtaSection = ({ heading, subheading, buttonLabel }) => (
  <Container className="mt-5" fluid>
    <Jumbotron className="bg-light">
      <Row className="align-items-center justify-content-center" noGutters>
        <Col xs={12} md={6}>
          <h1>{heading}</h1>
          <p>{subheading}</p>
        </Col>
        <Col className="d-flex justify-content-center" xs={12} md={6}>
          <Button className="btn-lg">{buttonLabel}</Button>
        </Col>
      </Row>
    </Jumbotron>
  </Container>
);

CtaSection.propTypes = {
  heading: propTypes.string,
  subheading: propTypes.string,
  buttonLabel: propTypes.string,
};

export default CtaSection;
