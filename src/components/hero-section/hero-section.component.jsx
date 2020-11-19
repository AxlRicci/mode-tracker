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
      <Col xs={{ span: 12, order: 2 }} md={{ span: 6, order: 1 }}>
        <Jumbotron className="pl-0 bg-white" bg="white">
          <h1>Encourage Sustainable Travel At Your School</h1>
          <p>
            Modal is an online survey platform that focuses on tracking and
            analysing travel mode split for school communities. With Modal you
            can complete travel mode surveys in seconds from any device.
          </p>
          <p>
            <Button variant="primary">Get Started</Button>
          </p>
        </Jumbotron>
      </Col>
      <Col xs={{ span: 12, order: 1 }} md={{ span: 6, order: 2 }}>
        <Image alt="header image" src={HeaderImage} fluid />
      </Col>
    </Row>
  </Container>
);

export default HeroSection;
