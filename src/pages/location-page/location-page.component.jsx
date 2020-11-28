import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Spinner from 'react-bootstrap/Spinner';

import { firestore } from '../../firebase/firebase.utils';

import SurveyList from '../../components/survey-list/survey-list.component';
import LocationOverview from '../../components/location-overview/location-overview.component';

const LocationPage = ({
  match: {
    params: { id },
  },
  history,
}) => {
  const [location, setLocation] = useState(null);

  useEffect(() => {
    const locationRef = firestore.collection('/locations').doc(id);
    locationRef.onSnapshot(async (locationDoc) => {
      if (locationDoc.exists) {
        const locationData = await locationDoc.data();
        setLocation(locationData);
      } else {
        // redirect to home or to a 404...
        history.push('/');
      }
    });
  }, [id, history]);

  return (
    <Container fluid>
      {location ? (
        <>
          <Row>
            <Col>
              <h1>{location.locationName}</h1>
              <p>{location.locationAddress}</p>
            </Col>
            <Col className="d-flex justify-content-end align-items-center">
              <Button
                onClick={() => history.push('/survey')}
                size="lg"
              >{`Do a survey at ${location.locationName}`}</Button>
            </Col>
          </Row>
          <Row>
            <Col>
              <LocationOverview />
            </Col>
          </Row>
          <Row>
            <Col>
              <h2 className="mb-4">Recent Surveys</h2>
              <SurveyList
                query={{ field: 'location', value: location.locationId }}
              />
            </Col>
          </Row>
        </>
      ) : (
        <Container className="d-flex justify-content-center">
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        </Container>
      )}
    </Container>
  );
};

LocationPage.propTypes = {
  match: PropTypes.object,
  history: PropTypes.object,
};

export default withRouter(LocationPage);
