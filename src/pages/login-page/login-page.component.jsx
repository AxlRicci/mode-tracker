import React from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Jumbotron from 'react-bootstrap/Jumbotron';
import firebase, { uiConfig } from '../../firebase/firebase.utils';

const LoginPage = () => (
  <Container className="mt-3" fluid>
    <Jumbotron className="bg-info text-white">
      <Row>
        <Col xs={12} md={6}>
          <h1 className="d-none d-md-block display-2">Welcome,</h1>
          <h1 className="d-xs-block d-md-none text-center display-4">
            Welcome,
          </h1>
          <p className="lead d-none d-md-block">
            Register using the following options. If you do not already have an
            account, either of the sign in options will guide you through
            creating a new account.
          </p>
          <p className="text-center d-block d-md-none">
            Register using the following options. If you do not already have an
            account, either of the sign in options will guide you through
            creating a new account.
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
