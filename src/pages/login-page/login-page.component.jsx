import React from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Jumbotron from 'react-bootstrap/Jumbotron';
import firebase, { uiConfig } from '../../firebase/firebase.utils';

const LoginPage = () => (
  <Container fluid>
    <Jumbotron>
      <Row>
        <Col xs={12} md={6}>
          <h1>Welcome,</h1>
          <h5 className="mb-4">
            Use the following options to sign in and sign up!
          </h5>
          <p>
            Once you have a Modal account you can start to complete travel mode
            surveys with your class!
          </p>
        </Col>
        <Col
          xs={12}
          md={6}
          className="d-flex justify-content-center align-items-center"
        >
          <StyledFirebaseAuth
            uiConfig={uiConfig}
            firebaseAuth={firebase.auth()}
          />
        </Col>
      </Row>
    </Jumbotron>
  </Container>
);

export default LoginPage;
