import React, { useState, useEffect } from 'react';
import { firestore, collectionRefToMap } from '../../firebase/firebase.utils';

import './survey-list.styles.scss';

const SurveyList = () => {
  const [surveyList, setSurveyList] = useState([]);

  useEffect(() => {
    const surveyCollection = firestore.collection('locations');

    // subscribe to collection data stream.
    surveyCollection.onSnapshot(
      (collectionSnapshot) => {
        setSurveyList(collectionRefToMap(collectionSnapshot));
      },
      (err) => {
        console.log('error feching collection', err);
      }
    );

    // unsub from collection data stream.
    return () => firestore.collection('locations').onSnapshot(() => {});
  }, []);

  return (
    <div className="survey-list">
      {surveyList
        ? surveyList.map((survey) => (
            <div className="survey-item">
              <p>{survey.bike}</p>
            </div>
          ))
        : null}
    </div>
  );
};

export default SurveyList;
