import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import CardGroup from 'react-bootstrap/CardGroup';
import SurveyListCard from '../survey-list-card/survey-list-card.component';

import { firestore, collectionRefToMap } from '../../firebase/firebase.utils';

const SurveyList = ({ query }) => {
  const [surveyList, setSurveyList] = useState(null);

  useEffect(() => {
    const surveyCollection = firestore.collection('surveys');

    // subscribe to collection data stream.
    surveyCollection.onSnapshot(
      async (collectionSnapshot) => {
        const allSurveys = await collectionRefToMap(collectionSnapshot);
        if (query) {
          const filteredSurveys = allSurveys.filter(
            (survey) => survey[query.field] === query.value
          );
          if (filteredSurveys.length > 0) {
            return setSurveyList(filteredSurveys);
          }
          return setSurveyList(null);
        }
        setSurveyList(allSurveys);
      },
      (err) => {
        console.log('error feching collection', err);
      }
    );

    // unsub from collection data stream.
    return () => firestore.collection('surveys').onSnapshot(() => {});
  }, [query]);
  return (
    <CardGroup>
      {surveyList ? (
        surveyList.map((survey) => (
          <SurveyListCard key={survey.user} survey={survey} />
        ))
      ) : (
        <h6 className="muted">
          No surveys have been completed at this location.
        </h6>
      )}
    </CardGroup>
  );
};

SurveyList.propTypes = {
  query: PropTypes.object,
};
export default SurveyList;
