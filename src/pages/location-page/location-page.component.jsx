import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { firestore } from '../../firebase/firebase.utils';

import SurveyList from '../../components/survey-list/survey-list.component';

import './location-page.styles.scss';

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
      <div className="location-page">
        <h1>Location Page for {location.locationName}</h1>
        <SurveyList query={{ field: 'location', value: location.locationId }} />
      </div>
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
