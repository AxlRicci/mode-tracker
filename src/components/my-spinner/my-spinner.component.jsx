import React from 'react';

import Container from 'react-bootstrap/Container';
import Spinner from 'react-bootstrap/Spinner';

const MySpinner = () => (
  <Container className="d-flex justify-content-center">
    <Spinner animation="border" role="status">
      <span className="sr-only">Loading...</span>
    </Spinner>
  </Container>
);

export default MySpinner;
