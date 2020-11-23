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

export const fetchLocationDocument = async (id) => {
  const locationRef = firestore.collection('/locations').doc(id);
  const locationDoc = await locationRef.get();
  return locationDoc.data();
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
  // format data
  const formatted = {
    createdAt: survey.createdAt,
    grade: survey.grade,
    location: survey.location,
    user: survey.user,
    data: {
      to: [
        { name: 'bike', value: parseInt(survey.data.tlBike) },
        { name: 'walk', value: parseInt(survey.data.tlWalk) },
        { name: 'roll', value: parseInt(survey.data.tlRoll) },
        { name: 'schoolbus', value: parseInt(survey.data.tlSchoolbus) },
        { name: 'publicTrans', value: parseInt(survey.data.tlPublicTrans) },
        { name: 'car', value: parseInt(survey.data.tlCar) },
      ],
      from: [
        { name: 'bike', value: parseInt(survey.data.flBike) },
        { name: 'walk', value: parseInt(survey.data.flWalk) },
        { name: 'roll', value: parseInt(survey.data.flRoll) },
        { name: 'schoolbus', value: parseInt(survey.data.flSchoolbus) },
        { name: 'publicTrans', value: parseInt(survey.data.flPublicTrans) },
        { name: 'car', value: parseInt(survey.data.flCar) },
      ],
    },
  };
  // create survey document in surveys collection
  const surveyRef = firestore.collection('/surveys').doc();
  await surveyRef.set(formatted);
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

// Get all data for surveys for a specific direction completed at a specific location
export const getAllSurveyData = async (locationId, direction, format) => {
  const locationRef = firestore.collection('locations').doc(locationId);
  const locationDoc = await locationRef.get();
  const locationData = locationDoc.data();

  const tally = await locationData.surveys.reduce(async (acc, current) => {
    const surveyDoc = await current.get();
    const surveyData = await surveyDoc.data();
    if (surveyData) {
      surveyData.data[direction].forEach((mode) => {
        acc[mode.name] = (acc[mode.name] || 0) + mode.value;
      });
      return acc;
    }
    return acc;
  }, {});

  if (format === 'graph') {
    const graphFormat = [
      { name: 'bike', value: tally.bike },
      { name: 'walk', value: tally.walk },
      { name: 'roll', value: tally.roll },
      { name: 'schoolbus', value: tally.schoolbus },
      { name: 'publicTrans', value: tally.publicTrans },
      { name: 'car', value: tally.car },
    ];
    return graphFormat;
  }
  return tally;
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
  } else {
    throw new Error('location exists');
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
