import React from 'react';
import propTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';

const NotFoundPage = ({ history }) => (
  <Container>
    <Jumbotron>
      <h1 className="display-3">Page not found...</h1>
      <p className="lead">Ooops, the page you requested does not exist.</p>
      <Button variant="info" onClick={() => history.push('/')}>
        Go back to home page
      </Button>
    </Jumbotron>
  </Container>
);

NotFoundPage.propTypes = {
  history: propTypes.object,
};

export default withRouter(NotFoundPage);
