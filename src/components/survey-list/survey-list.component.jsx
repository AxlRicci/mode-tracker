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
          setSurveyList(
            allSurveys.filter((survey) => survey[query.field] === query.value)
          );
        } else {
          setSurveyList(allSurveys);
        }
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
      {surveyList
        ? surveyList.map((survey) => <SurveyListCard survey={survey} />)
        : null}
    </CardGroup>
  );
};

SurveyList.propTypes = {
  query: PropTypes.object,
};
export default SurveyList;
