import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { firestore, collectionRefToMap } from '../../firebase/firebase.utils';

import './location-picker.styles.scss';

const LocationPicker = ({ value, handleChange }) => {
  const [locations, setLocations] = useState([]);
  useEffect(() => {
    const locationCollectionRef = firestore.collection('locations');
    // subscribe to collection data stream.
    locationCollectionRef.onSnapshot(
      async (collectionSnapshot) => {
        const locationArray = await collectionRefToMap(collectionSnapshot);
        const locationOptions = locationArray.map((location) => ({
          value: location.locationId,
          label: `${location.locationName} - ${location.locationAddress}`,
        }));
        setLocations(locationOptions);
      },
      (err) => {
        console.log('error feching collection', err);
      }
    );
    // unsub from collection data stream.
    return () => firestore.collection('locations').onSnapshot(() => {});
  }, [value]);

  return (
    <div className="location-picker">
      <label htmlFor="location-select">
        Location:
        <select onChange={handleChange} name="location" id="location-select">
          {locations.map((option) => {
            if (option.value === value) {
              return (
                <option key={option.value} value={option.value} selected>
                  {option.label}
                </option>
              );
            }
            return (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            );
          })}
        </select>
      </label>
    </div>
  );
};

LocationPicker.propTypes = {
  value: PropTypes.object,
  handleChange: PropTypes.func,
};

export default LocationPicker;
