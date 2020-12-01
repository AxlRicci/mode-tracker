import React from 'react';
import propTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import LocationList from '../../components/location-list/location-list.component';

const LocationListPage = ({ history }) => (
  <Container className="mt-3">
    <Jumbotron className="bg-info text-white">
      <Row>
        <Col xs={12} lg={6}>
          <h1 className="text-center text-lg-left display-4 mb-4 mb-lg-0">
            Schools
          </h1>
        </Col>
        <Col
          xs={12}
          lg={6}
          className="d-flex flex-column align-items-center justify-content-center"
        >
          <p className="lead">Don't see your school?</p>
          <Button
            variant="outline-light"
            onClick={() => history.push('/add-location')}
          >
            Add a School
          </Button>
        </Col>
      </Row>
    </Jumbotron>
    <LocationList />
  </Container>
);

LocationListPage.propTypes = {
  history: propTypes.object,
};

export default withRouter(LocationListPage);
