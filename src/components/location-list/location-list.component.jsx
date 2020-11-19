import React from 'react';
import { withRouter } from 'react-router-dom';
import propTypes from 'prop-types';

import Table from 'react-bootstrap/Table';

const LocationList = ({ locations, history }) => (
  <Table striped hover>
    <thead>
      <tr>
        <th>Name</th>
        <th>Address</th>
        <th>Type</th>
        <th>Score</th>
      </tr>
    </thead>
    <tbody>
      {locations.map((location) => (
        <tr onClick={() => history.push(`/location/${location.locationId}`)}>
          <td>{location.locationName}</td>
          <td>{location.locationAddress}</td>
          <td>{location.locationType}</td>
          <td>98%</td>
        </tr>
      ))}
    </tbody>
  </Table>
);

LocationList.propTypes = {
  locations: propTypes.array,
  history: propTypes.object,
};

export default withRouter(LocationList);
