import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Spinner from 'react-bootstrap/Spinner';
import Jumbotron from 'react-bootstrap/Jumbotron';

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
        const locationData = locationDoc.data();
        setLocation(locationData);
      } else {
        // redirect to home or to a 404...
        history.push('/');
      }
    });
  }, [id, history]);

  return (
    <>
      {location ? (
        <Container className="mt-3">
          <Row className="mb-3">
            <Col xs={12} lg={8} className="text-center text-lg-left">
              <h1 className="display-3">{location.locationName}</h1>
              <p className="lead">{location.locationAddress}</p>
            </Col>
            <Col
              xs={12}
              lg={4}
              className="d-flex justify-content-center justify-content-lg-end align-items-center"
            >
              <Button
                variant="success"
                onClick={() =>
                  history.push({
                    pathname: '/survey',
                    state: { incomingLocation: location.locationId },
                  })
                }
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
              <h2 className="mb-4 display-4">Recent Surveys</h2>
              <SurveyList
                query={{ field: 'location', value: location.locationId }}
              />
            </Col>
          </Row>
        </Container>
      ) : (
        <Container className="d-flex justify-content-center">
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        </Container>
      )}
    </>
  );
};

LocationPage.propTypes = {
  match: PropTypes.object,
  history: PropTypes.object,
};

export default withRouter(LocationPage);
