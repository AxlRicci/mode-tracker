import React from 'react';

import Container from 'react-bootstrap/Container';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import LocationSearch from '../../components/location-search/location-search.component';

const AddLocationPage = () => (
  <Container className="mt-3">
    <Jumbotron className="bg-info text-white">
      <h1 className="display-4">Add a School</h1>
      <Row>
        <Col xs={12} lg={8}>
          <p className="lead">
            To add a school to Modal, use the following form to search for the
            your school. Then choose the correct address from the list of
            results.
          </p>
        </Col>
      </Row>
    </Jumbotron>
    <LocationSearch />
  </Container>
);

export default AddLocationPage;
