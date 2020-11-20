import React, { useEffect } from 'react';
import propTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import Jumbotron from 'react-bootstrap/Jumbotron';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';

import SurveyGraph from '../survey-graph/survey-graph.component';

import { graphiphyAllSurveyData } from '../../firebase/firebase.utils';

// has two columns 1.general overview numbers 2. graph using all data.
// general overview contains % using active transportation, number of students surveyed, button to download data.
// graph is the standard survey graph but uses all data availabe.
// this data needs to be compiled via firebase.utils

const LocationOverview = ({
  match: {
    params: { id },
  },
}) => {
  useEffect(() => {
    const getUsableData = async () => {
      const data = await graphiphyAllSurveyData(id, 'to');
      console.log(data);
    };
    getUsableData();
  }, []);
  return (
    <Jumbotron>
      <h2>Overview</h2>
      <Row>
        <Col>
          <h3>38% Active Transportation</h3>
          <p>500 students surveyed</p>
          <Button>Download Data</Button>
        </Col>
        <Col>
          <SurveyGraph />
        </Col>
      </Row>
    </Jumbotron>
  );
};

LocationOverview.propTypes = {
  match: propTypes.object,
};

export default withRouter(LocationOverview);
