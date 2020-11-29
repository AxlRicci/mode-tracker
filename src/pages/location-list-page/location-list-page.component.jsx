import React, { useState, useEffect } from 'react';
import propTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Spinner from 'react-bootstrap/Spinner';

import LocationList from '../../components/location-list/location-list.component';

import { firestore, collectionRefToMap } from '../../firebase/firebase.utils';

const LocationListPage = ({ history }) => {
  const [locationList, setLocationList] = useState(null);

  useEffect(() => {
    const locationCollectionRef = firestore.collection('/locations');
    locationCollectionRef.onSnapshot(async (locationCollection) => {
      const locationDocList = await collectionRefToMap(locationCollection);
      setLocationList(locationDocList);
    });
  });

  return (
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
      {locationList ? (
        <LocationList locations={locationList} />
      ) : (
        <Container
          className="d-flex justify-content-center align-items-center"
          fluid
        >
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        </Container>
      )}
    </Container>
  );
};

LocationListPage.propTypes = {
  history: propTypes.object,
};

export default withRouter(LocationListPage);
