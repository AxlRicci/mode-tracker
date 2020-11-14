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

// export firestore
export const firestore = firebase.firestore();

/// firestore utility functions ///

/// Create user document on signup.
export const createUserDocument = async (authResult) => {
  const { user } = authResult;
  console.log(user.uid);
  const userRef = firestore.collection('/users').doc(user.uid);
  const userDoc = await userRef.get();

  if (!userDoc.exists) {
    await userRef.set({
      uid: user.uid,
      displayName: user.displayName,
      createdAt: new Date(),
      surveys: [],
    });
  }
};

/// Fetch user profile data from firestore
export const fetchUserDocument = async (uid) => {
  const userRef = firestore.collection('/users').doc(uid);
  const userDoc = await userRef.get();
  return userDoc.data();
};

/// Save profile updates to firestore.
export const updateUserDocument = async (uid, userProfile) => {
  const userRef = firestore.collection('/users').doc(uid);
  const userData = await userRef.get().then((doc) => doc.data());
  userRef.set({
    ...userData,
    ...userProfile,
  });
};

/// Take Collection Reference and create an array.
export const collectionRefToMap = async (collection) => {
  const documents = collection.docs;
  const collectionMap = await documents.map((document) => document.data());
  return collectionMap;
};

/// Take form submission and update Firestore.
export const createNewSurveyDocument = async (survey, user) => {
  // create survey document in surveys collection
  const surveyRef = firestore.collection('/surveys').doc();
  await surveyRef.set(survey);
  // add reference in user's surveys array. (incomplete - need reference to survey.)
  const userRef = firestore.collection('/users').doc(user.uid);
  await userRef.update({
    surveys: firebase.firestore.FieldValue.arrayUnion(
      firestore.collection('/surveys').doc(surveyRef.id)
    ),
  });
  // add reference to survey in location's surveys collection (incomplete - need reference to survey)
  const locationRef = firestore.collection('/locations').doc(survey.location);
  await locationRef.update({
    surveys: firebase.firestore.FieldValue.arrayUnion(
      firestore.collection('/surveys').doc(surveyRef.id)
    ),
  });
};

/// Create Location document in Firestore.
export const createNewLocationDocument = async (result, name, type) => {
  const locationId = result.id.split('.')[1];
  const locationRef = firestore.collection('/locations').doc(locationId);
  const locationDoc = await locationRef.get();

  if (!locationDoc.exists) {
    await locationRef.set({
      locationId,
      locationAddress: result.place_name,
      locationCoords: result.center,
      locationName: name,
      locationType: type,
      surveys: [],
    });
  }
};

/// configuration for auth ui ///
export const uiConfig = {
  callbacks: {
    signInSuccessWithAuthResult: (authResult) => {
      console.log(authResult);
      createUserDocument(authResult);
      // if first time user? direct to first time user documentation page?
      return '/';
    },
  },
  signInFlow: 'popup',
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
  ],
};

export default firebase;
