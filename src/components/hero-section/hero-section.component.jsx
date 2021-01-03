import React from 'react';
import propTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Row from 'react-bootstrap/Row';

import HeaderImage from '../../assets/projection_minions.svg';

const HeroSection = ({ history }) => (
  <Container className="mt-3">
    <Row className="align-items-center" noGutters>
      <Col xs={{ span: 12, order: 2 }} lg={{ span: 6, order: 1 }}>
        <Jumbotron
          className="pl-0 bg-white text-center text-lg-left"
          bg="white"
        >
          <h1 className="display-3 mb-2 d-none d-md-block">
            Walk more with Modal
          </h1>
          <h1 className="display-4 mb-2 d-block d-md-none">
            Walk more with Modal
          </h1>
          <p className="lead mb-3 mt-3 mt-md-0">
            Modal helps schools encourage healthy and sustainable school travel
            by quickly and easily tracking and analysing travel mode split.
          </p>
          <Button
            className="my-5 my-lg-2 btn-lg"
            onClick={() => history.push('/survey')}
            variant="primary"
          >
            Try A Modal Survey
          </Button>
        </Jumbotron>
      </Col>
      <Col xs={{ span: 12, order: 1 }} lg={{ span: 6, order: 2 }}>
        <Image alt="header image" src={HeaderImage} fluid />
      </Col>
    </Row>
  </Container>
);

HeroSection.propTypes = {
  history: propTypes.object,
};

export default withRouter(HeroSection);
