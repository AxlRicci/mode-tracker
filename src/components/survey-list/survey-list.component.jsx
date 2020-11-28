import React, { useState, useEffect } from 'react';
import propTypes from 'prop-types';

import CardDeck from 'react-bootstrap/CardDeck';
import SurveyListCard from '../survey-list-card/survey-list-card.component';

import { firestore, collectionRefToMap } from '../../firebase/firebase.utils';

const SurveyList = ({ query, editable }) => {
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
    <CardDeck className="d-flex flex-column">
      {surveyList ? (
        surveyList.map((survey) => (
          <SurveyListCard
            key={survey.user} // change to survey id.. Needs to be added to survey submission in firebase utils
            survey={survey}
            editable={editable}
          />
        ))
      ) : (
        <h6 className="muted">
          No surveys have been completed at this location.
        </h6>
      )}
    </CardDeck>
  );
};

SurveyList.propTypes = {
  query: propTypes.object,
  editable: propTypes.bool,
};
export default SurveyList;
