import React, { useEffect, useState } from 'react';

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import { createNewLocationDocument } from '../../firebase/firebase.utils';
import FormInput from '../form-input/form-input.component';
import SelectInput from '../select-input/select-input.component';
import PlaceList from '../place-list/place-list.component';

import './place-search.styles.scss';

const PlaceSearch = () => {
  const [location, setLocation] = useState({
    locationName: '',
    locationType: '',
    streetNumber: '',
    streetName: '',
    city: '',
    province: '',
    postalCode: '',
    country: '',
  });
  const [search, setSearch] = useState('');
  const [results, setResults] = useState(null);

  const fetchResults = (searchTerm, API_KEY) => {
    fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${searchTerm}.json?access_token=${API_KEY}&cachebuster=1604269894568&autocomplete=false`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
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
    setSearch(searchTerm);
    fetchResults(search, process.env.REACT_APP_MAPBOX_KEY);
  };

  const selectGeocodedLocation = async (result) => {
    const { locationName, locationType } = location;
    createNewLocationDocument(result, locationName, locationType);
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
      <Form>
        <Form.Row>
          <FormInput
            handleChange={handleFormInputChange}
            label="Name"
            placeholder="Enter name of school"
            name="locationName"
            value={location.locationName}
          />
          <SelectInput
            label="Type"
            name="locationType"
            handleChange={handleFormInputChange}
            type="location"
          />
        </Form.Row>
        <Form.Row>
          <FormInput
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
            handleChange={handleFormInputChange}
            label="City"
            placeholder="Enter the city"
            name="city"
            value={location.city}
          />
          <FormInput
            handleChange={handleFormInputChange}
            label="Province / State"
            placeholder="Enter the province/state"
            name="province"
            value={location.province}
          />
          <FormInput
            handleChange={handleFormInputChange}
            label="Postal Code / ZIP"
            placeholder="Enter the postal code/zip code"
            name="postalCode"
            value={location.postalCode}
          />
          <FormInput
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
      <div className="place-search__results">
        {results ? (
          <PlaceList results={results} handleClick={selectGeocodedLocation} />
        ) : null}
      </div>
    </div>
  );
};

export default PlaceSearch;
