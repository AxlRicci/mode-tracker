import React, { useEffect, useState, useContext } from 'react';
import propTypes from 'prop-types';

import Card from 'react-bootstrap/Card';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Spinner from 'react-bootstrap/Spinner';
import { AlertContext } from '../../contexts/alert.context';

import SurveyGraph from '../survey-graph/survey-graph.component';
import SurveyTable from '../survey-table/survey-table.component';

import { fetchLocationDocument } from '../../firebase/firebase.utils';

// Will need a spinner to load survey data. Right now just has a if statement.

const SurveyListCard = ({ survey, editable }) => {
  const [alerts, setAlerts] = useContext(AlertContext);
  const [location, setLocation] = useState({});

  useEffect(() => {
    const getLocationName = async (locationId) => {
      if (locationId) {
        fetchLocationDocument(locationId)
          .then((locationDoc) => {
            setLocation(locationDoc);
          })
          .catch((err) => {
            setAlerts((alertList) => [
              ...alertList,
              { type: 'fail', message: err.message },
            ]);
          });
      }
    };
    getLocationName(survey.location);
  }, [survey, setAlerts]);

  if (location) {
    const date = new Date(survey.createdAt);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const formattedDate = `${month}-${day}-${year}`;

    return (
      <Card className="mb-5 shadow">
        <Card.Header>
          <div className="d-flex flex-column flex-md-row justify-content-between">
            <p className="lead">
              <strong>School:</strong> {location.locationName || null}
            </p>
            <p className="lead">
              <strong>Grade:</strong> {survey.grade}
            </p>
            <p className="lead">
              <strong>Completed:</strong> {formattedDate}
            </p>
          </div>
        </Card.Header>
        <Card.Body>
          <Tabs variant="tabs" className="info" defaultActiveKey="overview">
            <Tab eventKey="overview" title="Overview">
              <SurveyTable
                additionalClasses="mt-4"
                survey={survey}
                editable={editable}
              />
            </Tab>
            <Tab eventKey="toSchool" title="To School Graph">
              <SurveyGraph
                additionalClasses="mt-4"
                survey={survey.data.to}
                percentage
              />
            </Tab>
            <Tab eventKey="fromSchool" title="From School Graph">
              <SurveyGraph
                additionalClasses="mt-4"
                survey={survey.data.from}
                percentage
              />
            </Tab>
          </Tabs>
        </Card.Body>
      </Card>
    );
  }
  return (
    <Card className="d-flex justify-content-center align-items-center">
      <Spinner>
        <span className="sr-only">Loading...</span>
      </Spinner>
    </Card>
  );
};

SurveyListCard.propTypes = {
  survey: propTypes.object,
  editable: propTypes.bool,
};

export default SurveyListCard;
