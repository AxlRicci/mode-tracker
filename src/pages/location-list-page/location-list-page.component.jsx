import React, { useState, useEffect } from 'react';
import { firestore, collectionRefToMap } from '../../firebase/firebase.utils';

import './location-list-page.styles.scss';

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
      <div className="location-list">
        <h1>Location list</h1>
        {locationList.map((location) => (
          <div className="location">
            <p>{location.locationName}</p>
          </div>
        ))}
      </div>
    );
  }
  return (
    <div className="location-list">
      <h1>Loading...</h1>
    </div>
  );
};

export default LocationListPage;
