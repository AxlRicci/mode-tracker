import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import propTypes from 'prop-types';

import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import Spinner from 'react-bootstrap/Spinner';

import { locationListWithAdditionalData } from '../../firebase/firebase.utils';

const LocationList = ({ history }) => {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(null);

  useEffect(() => {
    const getAndSetLocationList = async () => {
      setLoading(true);
      const locationList = await locationListWithAdditionalData();
      setLocations(locationList);
      setLoading(false);
    };
    getAndSetLocationList();
  }, []);

  return (
    <Container className="p-0">
      {!loading ? (
        <Table striped hover>
          <thead>
            <tr>
              <th>Name</th>
              <th className="d-none d-md-table-cell">Address</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {locations.map((location) => (
              <tr
                key={location.locationId}
                onClick={() => history.push(`/location/${location.locationId}`)}
              >
                <td>{location.locationName}</td>
                <td className="d-none d-md-table-cell">
                  {location.locationAddress}
                </td>
                <td>
                  {location.totals.activeScore
                    ? `${location.totals.activeScore}%`
                    : 'No Data'}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <Container
          className="d-flex align-items-center justify-content-center"
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

LocationList.propTypes = {
  history: propTypes.object,
};

export default withRouter(LocationList);
