import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Row from 'react-bootstrap/Row';

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

  if (location) {
    return (
      <Container className="location-page">
        <Row>
          <Col>
            <h1>{location.locationName}</h1>
            <p>{location.locationAddress}</p>
          </Col>
          <Col>
            <Button size="lg">{`Do a survey at ${location.locationName}`}</Button>
          </Col>
        </Row>
        <Row>
          <Col>
            <LocationOverview />
          </Col>
        </Row>
        <SurveyList query={{ field: 'location', value: location.locationId }} />
      </Container>
    );
  }
  return (
    <div className="location-page">
      <h1>Loading...</h1>
    </div>
  );
};

LocationPage.propTypes = {
  match: PropTypes.object,
  history: PropTypes.object,
};

export default withRouter(LocationPage);
