import React, { useState } from 'react';

import PlaceSearch from '../../components/place-search/place-search.component';

import './add-location-page.styles.scss';

const AddLocationPage = () => (
  <div className="add-location">
    <h1>Add Location Page.</h1>
    <PlaceSearch />
  </div>
);

export default AddLocationPage;
