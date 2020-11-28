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
          <h1 className="d-none d-md-block display-2">Welcome,</h1>
          <h1 className="d-xs-block d-md-none text-center display-4">
            Welcome,
          </h1>
          <h3 className="d-none d-md-block mb-4">
            Register using the following options.
          </h3>
          <h5 className="d-xs-block d-md-none text-center mb-4">
            Register using the following options.
          </h5>
          <p className="text-center text-md-left">
            If you do not already have an account, either of the sign in options
            will guide you through creating a new account.
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
