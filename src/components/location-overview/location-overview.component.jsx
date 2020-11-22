import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import Jumbotron from 'react-bootstrap/Jumbotron';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';

import SurveyGraph from '../survey-graph/survey-graph.component';

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

  useEffect(() => {
    const fetchData = async () => {
      const locationDoc = await fetchLocationDocument(id);
      setLocationData(locationDoc);

      const toData = await getAllSurveyData(id, 'to', 'graph');
      const fromData = await getAllSurveyData(id, 'from', 'graph');
      const bothData = toData.map((mode, index) => ({
        name: mode.name,
        value: (mode.value += fromData[index].value),
      }));
      setSurveyData(bothData);
      const total = bothData.reduce((acc, current) => {
        let reassignedAcc = acc;
        reassignedAcc += current.value;
        return reassignedAcc;
      }, 0);
      const atTotal = bothData.reduce((acc, current) => {
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
      setAtPercent((atTotal / total) * 100);
      setTotalSurveyed(total);
    };
    fetchData();
  }, [id]);

  if (locationData) {
    return (
      <Jumbotron>
        <Row>
          <Col className="">
            <h2>Overview</h2>
            <p>{`At ${locationData.locationName}, ${atPercent}% of students use sustainable modes of transportation (biking, walking, rolling) to get to and from school. 
            In total ${totalSurveyed} students have been surveyed to gather this mode split`}</p>
            <Button>Download Data</Button>
          </Col>
          <Col>
            <SurveyGraph survey={surveyData} />
          </Col>
        </Row>
      </Jumbotron>
    );
  }

  return (
    <Jumbotron>
      <h1>Loading...</h1>
    </Jumbotron>
  );
};

LocationOverview.propTypes = {
  match: propTypes.object,
};

export default withRouter(LocationOverview);
