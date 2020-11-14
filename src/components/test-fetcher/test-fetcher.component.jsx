import React, { useEffect } from 'react';
import { firestore } from '../../firebase/firebase.utils';

const TestFetcher = () => {
  useEffect(() => {
    const ref = firestore.collection('/surveys').doc('/7IlbiBpwTN9jMiXpS0Tx');
    ref.onSnapshot((doc) => {
      console.log(doc);
    });
  });

  return <div>fetcher...</div>;
};

export default TestFetcher;
