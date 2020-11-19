import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { createNewLocationDocument } from '../../firebase/firebase.utils';
import FormInput from '../form-input/form-input.component';
import LocationSearchResultsList from '../location-search-results-list/location-search-results-list.component';

const LocationSearch = () => {
  const [location, setLocation] = useState({
    locationName: '',
    locationType: 'school',
    streetNumber: '',
    streetName: '',
    city: '',
    province: '',
    postalCode: '',
    country: '',
  });
  const [search, setSearch] = useState('');
  const [results, setResults] = useState(null);
  const [alert, setAlert] = useState(null);

  const fetchResults = (searchTerm, API_KEY) => {
    fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${searchTerm}.json?access_token=${API_KEY}&cachebuster=1604269894568&autocomplete=false`
    )
      .then((res) => res.json())
      .then((data) => {
        setResults(data.features);
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const {
      streetNumber,
      streetName,
      city,
      province,
      postalCode,
      country,
    } = location;
    const searchTerm = `${streetNumber} ${streetName} ${city} ${province} ${postalCode} ${country}`;
    fetchResults(searchTerm, process.env.REACT_APP_MAPBOX_KEY);
  };

  const selectGeocodedLocation = async (result) => {
    const { locationName, locationType } = location;
    try {
      await createNewLocationDocument(result, locationName, locationType);
      setAlert({ success: true, msg: 'Location successfully added' });
      setResults(null);
      setLocation({
        locationName: '',
        locationType: 'school',
        streetNumber: '',
        streetName: '',
        city: '',
        province: '',
        postalCode: '',
        country: '',
      });
    } catch (err) {
      setAlert({ success: false, msg: 'Location Already Exists' });
    }
  };

  const handleFormInputChange = (event) => {
    const { id, value } = event.target;
    setLocation({
      ...location,
      [id]: value,
    });
  };

  return (
    <div className="place-search">
      {alert ? (
        <Alert variant={alert.success ? 'success' : 'danger'}>
          {`${alert.msg}. `}
          <Alert.Link as={Link} to="/survey">
            Start a survey now.
          </Alert.Link>
        </Alert>
      ) : null}
      <Form>
        <Form.Row>
          <FormInput
            handleChange={handleFormInputChange}
            label="Name"
            placeholder="Enter name of school"
            name="locationName"
            value={location.locationName}
          />
        </Form.Row>
        <Form.Row>
          <FormInput
            sm={{ span: 3 }}
            handleChange={handleFormInputChange}
            label="Street Number"
            placeholder="Enter street number"
            name="streetNumber"
            value={location.streetNumber}
          />
          <FormInput
            handleChange={handleFormInputChange}
            label="Street Name"
            placeholder="Enter the street name"
            name="streetName"
            value={location.streetName}
          />
        </Form.Row>
        <Form.Row>
          <FormInput
            md={{ span: 6 }}
            lg={{ span: 3 }}
            handleChange={handleFormInputChange}
            label="City"
            placeholder="Enter the city"
            name="city"
            value={location.city}
          />
          <FormInput
            md={{ span: 6 }}
            lg={{ span: 3 }}
            handleChange={handleFormInputChange}
            label="Province / State"
            placeholder="Enter the province/state"
            name="province"
            value={location.province}
          />
          <FormInput
            md={{ span: 6 }}
            lg={{ span: 3 }}
            handleChange={handleFormInputChange}
            label="Postal Code / ZIP"
            placeholder="Enter the postal code/zip code"
            name="postalCode"
            value={location.postalCode}
          />
          <FormInput
            md={{ span: 6 }}
            lg={{ span: 3 }}
            handleChange={handleFormInputChange}
            label="Country"
            placeholder="Enter the country name"
            name="country"
            value={location.country}
          />
        </Form.Row>
        <Button variant="primary" onClick={handleSubmit}>
          Search
        </Button>
      </Form>
      {results ? (
        <div className="place-search__results-container mt-5">
          <h3 className="mb-4">Select the correct address from list</h3>
          <LocationSearchResultsList
            results={results}
            handleClick={selectGeocodedLocation}
          />
        </div>
      ) : null}
    </div>
  );
};

export default LocationSearch;
