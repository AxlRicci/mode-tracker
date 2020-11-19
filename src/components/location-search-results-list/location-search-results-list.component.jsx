import React from 'react';
import propTypes from 'prop-types';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';

const LocationSearchResultsList = ({ handleClick, results }) => (
  <ListGroup>
    {results.map((result) => (
      <ListGroup.Item key={result.id} className="">
        <Row className="">
          <Col
            xs={12}
            sm={8}
            className="d-flex align-items-center justify-content-start"
          >
            <h5>{result.place_name}</h5>
          </Col>
          <Col
            xs={12}
            sm={4}
            className="d-flex flex-sm-row align-items-center justify-content-center justify-content-sm-end"
          >
            <Button className="" onClick={() => handleClick(result)}>
              Select
            </Button>
          </Col>
        </Row>
      </ListGroup.Item>
    ))}
  </ListGroup>
);

LocationSearchResultsList.propTypes = {
  handleClick: propTypes.func,
  results: propTypes.array,
};

export default LocationSearchResultsList;
