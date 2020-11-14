import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { firestore, collectionRefToMap } from '../../firebase/firebase.utils';

import './survey-list.styles.scss';

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
    <div className="survey-list">
      {surveyList
        ? surveyList.map((survey) => (
            <div className="survey-item">
              <p>{survey.location}</p>
            </div>
          ))
        : null}
    </div>
  );
};

SurveyList.propTypes = {
  query: PropTypes.object,
};

export default SurveyList;
