import React from 'react';
import propTypes from 'prop-types';

import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';

const PlaceList = ({ handleClick, results }) => (
  <ListGroup className="mt-5">
    {results.map((result) => (
      <ListGroup.Item className="d-flex justify-content-between">
        <h5>{result.place_name}</h5>
        <Button onClick={handleClick}>Select</Button>
      </ListGroup.Item>
    ))}
  </ListGroup>
);

PlaceList.propTypes = {
  handleClick: propTypes.func,
  results: propTypes.array,
};

export default PlaceList;
