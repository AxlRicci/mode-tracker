import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { createNewLocationDocument } from '../../firebase/firebase.utils';
import { locationSearchFormValidation } from './location-search-validation.component';

import { AlertContext } from '../../contexts/alert.context';

import FormInput from '../form-input/form-input.component';
import LocationSearchResultsList from '../location-search-results-list/location-search-results-list.component';

const initialSearchValues = {
  locationName: '',
  locationType: 'school',
  streetNumber: '',
  streetName: '',
  city: '',
  province: '',
  postalCode: '',
  country: '',
};

const initialSearchErrorValues = {
  locationNameError: '',
  locationTypeError: 'school',
  streetNumberError: '',
  streetNameError: '',
  cityError: '',
  provinceError: '',
  postalCodeError: '',
  countryError: '',
};

const LocationSearch = () => {
  const [alerts, setAlerts] = useContext(AlertContext);

  const [search, setSearch] = useState(initialSearchValues);
  const [searchErrors, setSearchErrors] = useState(initialSearchErrorValues);
  const [results, setResults] = useState(null);

  const fetchResults = async (searchTerm, API_KEY) => {
    fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${searchTerm}.json?access_token=${API_KEY}&cachebuster=1604269894568&autocomplete=false`
    )
      .then((res) => res.json())
      .catch((err) => {
        throw new Error(
          `An error occured while fetching location results from mapbox. ${err}`
        );
      })
      .then((data) => {
        setResults(data.features);
      })
      .catch((err) => {
        throw new Error(
          `An error occured while parsing the result to .json. ${err}`
        );
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const validationErrorList = locationSearchFormValidation(search);
    setSearchErrors(validationErrorList);
    if (!validationErrorList) {
      const {
        streetNumber,
        streetName,
        city,
        province,
        postalCode,
        country,
      } = search;
      const searchTerm = `${streetNumber} ${streetName} ${city} ${province} ${postalCode} ${country}`;
      fetchResults(searchTerm, process.env.REACT_APP_MAPBOX_KEY)
        .then()
        .catch((err) => {
          setAlerts([...alerts, { type: 'fail', message: err.message }]);
        });
    }
  };

  const selectGeocodedLocation = async (result) => {
    const { locationName, locationType } = search;
    const validationErrorList = locationSearchFormValidation(search);
    setSearchErrors(validationErrorList);
    if (!validationErrorList) {
      createNewLocationDocument(result, locationName, locationType)
        .then(() => {
          setAlerts([
            ...alerts,
            {
              type: 'success',
              message: 'Location successfully added',
            },
          ]);
          setResults(null);
          setSearch(initialSearchValues);
        })
        .catch((err) => {
          setAlerts([...alerts, { type: 'fail', message: err.message }]);
        });
    }
  };

  const handleFormInputChange = (event) => {
    const { id, value } = event.target;
    setSearch({
      ...search,
      [id]: value,
    });
  };

  return (
    <Container>
      <Form>
        <Form.Row className="pl-1">
          <FormInput
            handleChange={handleFormInputChange}
            label="School Name"
            placeholder="Enter name of school"
            name="locationName"
            value={search.locationName}
            error={searchErrors.locationNameError}
          />
        </Form.Row>
        <Form.Row className="pl-1">
          <FormInput
            sm={{ span: 3 }}
            handleChange={handleFormInputChange}
            label="Street Number"
            placeholder="Enter street number"
            name="streetNumber"
            value={search.streetNumber}
            error={searchErrors.streetNumberError}
          />
          <FormInput
            handleChange={handleFormInputChange}
            label="Street Name"
            placeholder="Enter the street name"
            name="streetName"
            value={search.streetName}
            error={searchErrors.streetNameError}
          />
        </Form.Row>
        <Form.Row className="pl-1">
          <FormInput
            md={{ span: 6 }}
            lg={{ span: 3 }}
            handleChange={handleFormInputChange}
            label="City"
            placeholder="Enter the city"
            name="city"
            value={search.city}
            error={searchErrors.cityError}
          />
          <FormInput
            md={{ span: 6 }}
            lg={{ span: 3 }}
            handleChange={handleFormInputChange}
            label="Province / State"
            placeholder="Enter the province/state"
            name="province"
            value={search.province}
            error={searchErrors.provinceError}
          />
          <FormInput
            md={{ span: 6 }}
            lg={{ span: 3 }}
            handleChange={handleFormInputChange}
            label="Postal Code / ZIP"
            placeholder="Enter the postal code/zip code"
            name="postalCode"
            value={search.postalCode}
            error={searchErrors.postalCodeError}
          />
          <FormInput
            md={{ span: 6 }}
            lg={{ span: 3 }}
            handleChange={handleFormInputChange}
            label="Country"
            placeholder="Enter the country name"
            name="country"
            value={search.country}
            error={searchErrors.countryError}
          />
        </Form.Row>
        <Button variant="info" onClick={handleSubmit}>
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
    </Container>
  );
};

export default LocationSearch;
