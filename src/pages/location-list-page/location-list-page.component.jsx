import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import { firestore, collectionRefToMap } from '../../firebase/firebase.utils';

import LocationList from '../../components/location-list/location-list.component';

const LocationListPage = () => {
  const [locationList, setLocationList] = useState(null);

  useEffect(() => {
    const locationCollectionRef = firestore.collection('/locations');
    locationCollectionRef.onSnapshot(async (locationCollection) => {
      const locationDocList = await collectionRefToMap(locationCollection);
      setLocationList(locationDocList);
    });
  });

  if (locationList) {
    return (
      <Container className="mt-3">
        <h1 className="mb-5">All Schools</h1>
        <LocationList locations={locationList} />
      </Container>
    );
  }
  return (
    <div className="location-list">
      <h1>Loading...</h1>
    </div>
  );
};

export default LocationListPage;
