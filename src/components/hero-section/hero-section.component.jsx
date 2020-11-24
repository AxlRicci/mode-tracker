import React from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Row from 'react-bootstrap/Row';

import HeaderImage from '../../assets/undraw_walking_outside_5ueb.svg';

const HeroSection = () => (
  <Container>
    <Row className="align-items-center" noGutters>
      <Col xs={{ span: 12, order: 2 }} lg={{ span: 6, order: 1 }}>
        <Jumbotron className="pl-0 bg-white" bg="white">
          <span>
            <h1 className="display-2 mb-0">Sit Less,</h1>
            <h1 className="display-2">Walk More</h1>
          </span>
          <p className="lead">
            Use Modal to encouraging sustainable school travel by tracking and
            analysing travel mode split for school communities.
          </p>
          <p>
            <Button variant="primary">Get Started</Button>
          </p>
        </Jumbotron>
      </Col>
      <Col xs={{ span: 12, order: 1 }} lg={{ span: 6, order: 2 }}>
        <Image
          className="d-none d-lg-block"
          alt="header image"
          src={HeaderImage}
          fluid
        />
      </Col>
    </Row>
  </Container>
);

export default HeroSection;
