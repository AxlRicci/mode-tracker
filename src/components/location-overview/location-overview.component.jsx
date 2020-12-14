import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import Jumbotron from 'react-bootstrap/Jumbotron';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Spinner from 'react-bootstrap/Spinner';

import MySpinner from '../my-spinner/my-spinner.component';

import SurveyGraph from '../survey-graph/survey-graph.component';

import { ReactComponent as Alert } from '../../assets/alert.svg';

import {
  getTransportTotals,
  fetchLocationDocument,
} from '../../firebase/firebase.utils';

const LocationOverview = ({
  match: {
    params: { id },
  },
}) => {
  const [location, setLocation] = useState(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      if (id) {
        const locationData = await fetchLocationDocument(id);
        setLocation(locationData);
      }
      setLoading(false);
    };
    getData();
  }, [id]);

  if (isLoading)
    return (
      <Jumbotron>
        <MySpinner />
      </Jumbotron>
    );

  const { activeScore, data, totalSurveyed } = location.summary;
  const { locationName } = location;
  return (
    <Jumbotron className="bg-light">
      {location.summary ? (
        <Row>
          <Col>
            <h2>Overview</h2>
            <p>{`At ${locationName}, ${Math.round(
              activeScore * 100
            )}% of students use sustainable modes of transportation (biking, walking, rolling) to get to and from school. 
            In total, ${totalSurveyed} students have been surveyed to calculate this mode split.`}</p>
          </Col>
          <Col>
            <SurveyGraph survey={data} percentage />
          </Col>
        </Row>
      ) : (
        <Row>
          <Col className="d-flex">
            <Alert className="mr-2" />{' '}
            <h5>No transportation data available.</h5>
          </Col>
        </Row>
      )}
    </Jumbotron>
  );
};

LocationOverview.propTypes = {
  match: propTypes.object,
};

export default withRouter(LocationOverview);
