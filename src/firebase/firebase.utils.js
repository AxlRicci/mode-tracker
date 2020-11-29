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

/// firestore utility functions
/// ///////////////////////////////////////////////////////////////////////////////////////

///
/// ** Create user document on signup **
/// Notes: Runs everytime a user signs in.
/// If a user does not exist in the database, the function will create a new record for that user.
/// --> Retuns a user object
/// /////////////////////////////////////
export const createUserDocument = async (authResult) => {
  // Take authResult from firebase.auth signin and query the database for the user's document.
  const { user } = authResult;
  const userRef = firestore.doc(`/users/${user.uid}`);
  const userDoc = await userRef.get();
  // If the document does not exist, a new document is created using the user data provided by authResult.
  if (!userDoc.exists) {
    await userRef.set({
      uid: user.uid,
      displayName: user.displayName,
      createdAt: new Date(),
      surveys: [],
    });
  }
  return user; // Returns the user data incase it is needed.
};

///
/// ** Fetch user profile data **
/// Notes: Fetches a user's document from the database using the unique user id.
/// --> Returns the data from the user document.
/// ////////////////////////////////////////
export const fetchUserDocument = async (uid) => {
  const userDoc = await firestore.doc(`/users/${uid}`).get();
  return userDoc.data();
};

///
/// ** Fetch a location document **
/// Notes: Fetches a location document from the database using a locationId.
/// --> Returns a location object
/// ////////////////////////////////////////
export const fetchLocationDocument = async (locationId) => {
  const locationDoc = await firestore.doc(`locations/${locationId}`).get();
  return locationDoc.data();
};

///
/// ** Fetch all location documents **
/// Notes: Fetches all location documents available in the locations collection.
/// --> Returns an array of location objects.
/// ////////////////////////////////////////
export const fetchAllLocationData = async () => {
  const locationCollection = await firestore.collection(`locations`).get();
  // Iterate through the documents within the collection reference.
  const locationsArray = locationCollection.docs.reduce((acc, curr) => {
    acc.push(curr.data()); // Get data from each document and add it to the reducer's accumulated array.
    return acc;
  }, []);
  return locationsArray; // Returns array of location documents.
};

///
/// ** Save profile updates to firestore **
/// Notes: Saves updates made to user profile to database.
/// --> Returns nothing.
/// ////////////////////////////////////////
export const updateUserDocument = async (uid, userProfile) => {
  const userRef = firestore.doc(`users/${uid}`);
  const userData = await userRef.get().then((doc) => doc.data());
  userRef.set({
    ...userData,
    ...userProfile,
  });
};

///
/// ** Map all documents in a collection **
/// Notes: Takes a collection reference and iterates through all documents fetching data for each.
/// --> Returns an array of document objects.
/// ////////////////////////////////////////
export const collectionRefToMap = async (collection) => {
  const documents = collection.docs;
  const collectionMap = await documents.map((document) => document.data());
  return collectionMap;
};

///
/// ** Submit survey form to database **
/// Notes: Takes a survey object and user object, varifies and formats the data and then makes multiple entries in the database.
/// Entry 1: A survey document with the formatted survey is created in the surveys collection
/// Entry 2: A reference (to the survey document) is added to the associated location document in the surveys array.
/// Entry 3: A reference (to the survey document) is added to the associated user document in the surveys array.
/// Entry 3 Note: If a user is not signed in, the reference will not be added to a user document and the userId of the survey will be set to 'anonymous'
/// --> Returns the survey object formatted just as it is in the database.
/// ////////////////////////////////////////
export const createNewSurveyDocument = async (survey, user) => {
  // format incoming survey and user data into form acceptable for database.
  const formatted = {
    createdAt: survey.createdAt,
    grade: survey.grade,
    location: survey.location,
    user: survey.user || 'anonymous',
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
  // Create survey document in surveys collection
  const surveyRef = firestore.collection('/surveys').doc();
  await surveyRef.set({ ...formatted, surveyId: surveyRef.id });
  // Check if a user is associated with the incoming survey.
  // If true, add reference in user's surveys array.
  // If false, do not add a reference to a user's array.
  if (user) {
    const userRef = firestore.doc(`users/${user.uid}`);
    await userRef.update({
      surveys: firebase.firestore.FieldValue.arrayUnion(
        firestore.doc(`surveys/${surveyRef.id}`)
      ),
    });
  }
  // Add reference to survey in location's surveys collection
  const locationRef = firestore.doc(`locations/${survey.location}`);
  await locationRef.update({
    surveys: firebase.firestore.FieldValue.arrayUnion(
      firestore.doc(`surveys/${surveyRef.id}`)
    ),
  });
  return formatted; // Return the survey object formatted in the same way as in the database
};

///
/// ** Update mode values in a survey **
/// Notes: Replaces the survey at a specific id with an newValueObject.
/// The newValue object includes keys:
/// + name: which value to replace (bike, walk, roll, etc)
/// + direction: which direction the value belongs to (to, from)
/// + value: the updated value
/// --> Returns either success or error objects.
/// ////////////////////////////////////////
export const updateSurveyData = async (surveyId, newValueObject) => {
  const { direction, name, value } = newValueObject;

  const surveyRef = firestore.doc(`surveys/${surveyId}`);
  const surveyDoc = await surveyRef.get();
  const surveyData = surveyDoc.data();
  // Attempt to update the survey.
  surveyRef
    .update({
      ...surveyData,
      data: {
        ...surveyData.data,
        [direction]: [
          // Spreads in the new survey data for a specific direction.
          ...surveyData.data[direction].map((mode) => {
            // Checks to see if the current value is the value that needs to be updated.
            if (mode.name === name) {
              return { name, value }; // Updates the value by replacing its object.
            }
            return mode; // If it is not the one to be updated the original is returned.
          }),
        ],
      },
    })
    .then(() => ({
      name: 'success',
      message: `successfully updated survey ${surveyId}`,
    }))
    .catch((err) => ({
      name: 'error',
      message: `An ${err.name} error occured: ${err.message}`,
    }));
};

///
/// ** Delete survey **
/// Notes: Deletes a survey from the database using a surveyId.
/// --> returns nothing (..yet, will have error handling).
/// ////////////////////////////////////////

// ** Needs to remove survey references from location as well as user!!

export const deleteSurvey = async (surveyId) => {
  firestore
    .collection('surveys')
    .doc(surveyId)
    .delete()
    .then(() => console.log(`survey ${surveyId} deleted`))
    .catch((err) => console.log('error removing document', err));
};

///
/// ** Fetch (and optionally format) data for a specific location and direction **
/// Notes: Compiles the numbers for each mode type for all surveys for a specific direction.
/// Graph format: formatted for recharts library (array of objects)
/// Standard format: {[mode]: value, ...}
/// --> Returns a compiled survey object (either in standard or graph format)
/// ////////////////////////////////////////
export const getAllSurveyData = async (locationId, direction, format) => {
  const locationDoc = await firestore.doc(`locations/${locationId}`).get();
  const locationData = locationDoc.data();

  // iterates through all survey references for the location and uses reduce to add the results for each mode together.
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

  // Checks for graph format type, returns if true.
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
  // If not graph format type, returns standard object.
  return tally;
};

///
/// ** Create Location document in Firestore **
/// Notes: Takes a mapbox location search result object, checks for its existance in the database,
/// then adds a new document to the locations collection.
/// --> Returns: Location object if successful
/// ////////////////////////////////////////
export const createNewLocationDocument = async (result, name, type) => {
  const locationId = result.id.split('.')[1];
  const locationRef = firestore.doc(`locations/${locationId}`);
  const locationDoc = await locationRef.get();

  if (!locationDoc.exists) {
    const newLocation = {
      locationId,
      locationAddress: result.place_name,
      locationCoords: result.center,
      locationName: name,
      locationType: type,
      surveys: [],
    };
    await locationRef.set(newLocation);
    return newLocation;
  }
  throw new Error('location exists');
};

///
/// ** Configuration for Firebase auth ui **
/// ////////////////////////////////////////
export const uiConfig = {
  callbacks: {
    signInSuccessWithAuthResult: (authResult) => {
      createUserDocument(authResult);
      return true;
    },
  },
  signInSuccessUrl: '/profile',
  signInFlow: 'popup',
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
  ],
};

export default firebase;
