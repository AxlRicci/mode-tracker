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
  const [locationData, setLocationData] = useState(null);
  const [locationMetrics, setLocationMetrics] = useState({
    activeScore: 0,
    totalSurveyed: 0,
    data: [],
  });
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      if (id) {
        const locationDoc = await fetchLocationDocument(id);
        setLocationData(locationDoc);
        const transportTotals = await getTransportTotals(id);
        setLocationMetrics({
          activeScore: transportTotals.activeScore,
          totalSurveyed: transportTotals.totalSurveyed,
          data: transportTotals.data,
        });
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

  const { totalSurveyed, activeScore, data } = locationMetrics;
  return (
    <Jumbotron className="bg-light">
      {locationMetrics.data ? (
        <Row>
          <Col>
            <h2>Overview</h2>
            <p>{`At ${locationData.locationName}, ${activeScore}% of students use sustainable modes of transportation (biking, walking, rolling) to get to and from school. 
            In total ${totalSurveyed} students have been surveyed to gather this mode split.`}</p>
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
