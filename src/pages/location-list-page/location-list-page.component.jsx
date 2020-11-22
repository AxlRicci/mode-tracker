import React, { useState, useEffect } from 'react';

import Container from 'react-bootstrap/Container';
import Spinner from 'react-bootstrap/Spinner';

import LocationList from '../../components/location-list/location-list.component';

import { firestore, collectionRefToMap } from '../../firebase/firebase.utils';

const LocationListPage = () => {
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
      <h1 className="mb-5">All Schools</h1>
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

export default LocationListPage;
