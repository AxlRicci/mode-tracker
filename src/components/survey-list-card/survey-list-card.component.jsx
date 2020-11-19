import React from 'react';
import propTypes from 'prop-types';

import Card from 'react-bootstrap/Card';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

import SurveyGraph from '../survey-graph/survey-graph.component';
import SurveyTable from '../survey-table/survey-table.component';

// Will need a spinner to load survey data. Right now just has a if statement.

const SurveyListCard = ({ survey, label }) => {
  if (survey) {
    return (
      <Card>
        <Card.Body>
          <Card.Title>
            <h3>TEMP LABEL HERE</h3>{' '}
          </Card.Title>
          <Tabs defaultActiveKey="overview">
            <Tab eventKey="overview" title="Overview">
              <SurveyTable additionalClasses="mt-4" survey={survey.data} />
            </Tab>
            <Tab eventKey="toSchool" title="To School">
              <SurveyGraph additionalClasses="mt-4" survey={survey.data.to} />
            </Tab>
            <Tab eventKey="fromSchool" title="From School">
              <SurveyGraph additionalClasses="mt-4" survey={survey.data.from} />
            </Tab>
          </Tabs>
        </Card.Body>
      </Card>
    );
  }
  return (
    <Card>
      <Card.Title>Spinner...</Card.Title>
    </Card>
  );
};

SurveyListCard.propTypes = {
  survey: propTypes.object,
  label: propTypes.string,
};

export default SurveyListCard;

// <ResponsiveContainer width="100%" height={200}>
//   <BarChart data={survey.data.to} barCategoryGap="1">
//     <XAxis dataKey="name" />
//     <Bar dataKey="value" label={{ fill: 'white' }} />
//   </BarChart>
// </ResponsiveContainer>;
