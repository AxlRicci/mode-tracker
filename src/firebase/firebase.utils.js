import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDVuEVA2n8VvqXA1UUfdl5no3G1xQ1nqTc',
  authDomain: 'mode-tracker.firebaseapp.com',
  databaseURL: 'https://mode-tracker.firebaseio.com',
  projectId: 'mode-tracker',
  storageBucket: 'mode-tracker.appspot.com',
  messagingSenderId: '544538939732',
  appId: '1:544538939732:web:76a39581f2f9fce7bb38c1',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

/// export firestore
export const firestore = firebase.firestore();

/// firestore utility functions
export const collectionRefToMap = (collection) => {
  const documents = collection.docs;
  const collectionMap = documents.map((document) => document.data());
  console.log(collectionMap);
  return collectionMap;
};

/// configuration for auth ui
export const uiConfig = {
  callbacks: {
    signInSuccessWithAuthResult: (authResult, redirectUrl) => {
      console.log(authResult);
      // if first time user? direct to first time user documentation page?
      return true;
    },
  },
  signInFlow: 'popup',
  signInSuccessUrl: '/',
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
  ],
};

export default firebase;
