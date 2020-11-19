import React from 'react';

import Container from 'react-bootstrap/Container';

import LocationSearch from '../../components/location-search/location-search.component';

const AddLocationPage = () => (
  <Container className="mt-3">
    <h1 className="mb-5 mt-3">Add a school to Modal</h1>
    <LocationSearch />
  </Container>
);

export default AddLocationPage;
