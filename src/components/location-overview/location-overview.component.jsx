import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import Jumbotron from 'react-bootstrap/Jumbotron';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';

import SurveyGraph from '../survey-graph/survey-graph.component';

import { ReactComponent as Alert } from '../../assets/alert.svg';

import {
  getAllSurveyData,
  fetchLocationDocument,
} from '../../firebase/firebase.utils';

// has two columns 1.general overview numbers 2. graph using all data.
// general overview contains % using active transportation, number of students surveyed, button to download data.
// graph is the standard survey graph but uses all data availabe.
// this data needs to be compiled via firebase.utils

const LocationOverview = ({
  match: {
    params: { id },
  },
}) => {
  const [surveyData, setSurveyData] = useState(null);
  const [atPercent, setAtPercent] = useState(null);
  const [totalSurveyed, setTotalSurveyed] = useState(null);
  const [locationData, setLocationData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch location data
    const fetchLocationData = async () => {
      const locationDoc = await fetchLocationDocument(id);
      return locationDoc;
    };

    // Fetch survey data
    const fetchSurveyData = async () => {
      const toData = await getAllSurveyData(id, 'to', 'graph');
      const fromData = await getAllSurveyData(id, 'from', 'graph');
      if (toData[0].value && fromData[0].value) {
        const bothData = toData.map((mode, index) => ({
          name: mode.name,
          value: (mode.value += fromData[index].value),
        }));
        return bothData;
      }
    };

    // Calculate transportation totals and percentages
    const calculateTotalSurveyed = (surveyDater) =>
      surveyDater.reduce((acc, current) => {
        let reassignedAcc = acc;
        reassignedAcc += current.value;
        return reassignedAcc;
      }, 0);

    const calculateTotalAt = (surveyDater) =>
      surveyDater.reduce((acc, current) => {
        let reassignedAcc = acc;
        switch (current.name) {
          case 'bike':
            reassignedAcc += current.value;
            break;
          case 'walk':
            reassignedAcc += current.value;
            break;
          case 'roll':
            reassignedAcc += current.value;
            break;
          default:
            return reassignedAcc;
        }
        return reassignedAcc;
      }, 0);

    const getData = async () => {
      const locationInfo = await fetchLocationData();
      setLocationData(locationInfo);
      const surveyInfo = await fetchSurveyData();
      if (surveyInfo) {
        setSurveyData(surveyInfo);
        const amountSurveyed = calculateTotalSurveyed(surveyInfo);
        setTotalSurveyed(amountSurveyed);
        const totalAt = calculateTotalAt(surveyInfo);
        setAtPercent((totalAt / amountSurveyed) * 100);
      }
      setLoading(false);
    };

    getData();

    // if survey data exists clean it to be used in graph
    // if survey data does not exist, set component into no-data state.
  }, [id]);

  if (!loading) {
    return (
      <Jumbotron>
        {surveyData ? (
          <Row>
            <Col>
              <h2>Overview</h2>
              <p>{`At ${locationData.locationName}, ${atPercent}% of students use sustainable modes of transportation (biking, walking, rolling) to get to and from school. 
            In total ${totalSurveyed} students have been surveyed to gather this mode split.`}</p>
              <Button>Download Data</Button>
            </Col>
            <Col>
              <SurveyGraph survey={surveyData} />
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
  }
  return (
    <Jumbotron>
      <Row className="d-flex justify-content-center">
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      </Row>
    </Jumbotron>
  );
};

LocationOverview.propTypes = {
  match: propTypes.object,
};

export default withRouter(LocationOverview);
