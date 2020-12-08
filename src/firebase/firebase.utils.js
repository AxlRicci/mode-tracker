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
  userRef
    .get()
    .then((userDoc) => {
      // If the document does not exist, a new document is created using the user data provided by authResult.
      if (!userDoc.exists) {
        userRef
          .set({
            uid: user.uid,
            displayName: user.displayName,
            createdAt: new Date(),
            surveys: [],
          })
          .then()
          .catch((err) => {
            throw new Error(
              `An error occured when creating a new user document: ${err}`
            );
          });
      } else {
        throw new Error('An error occured. User already exists. Please login');
      }
    })
    .catch((err) => {
      throw new Error(err);
    });
  return user; // Returns the user data incase it is needed.
};

///
/// ** Fetch user profile data **
/// Notes: Fetches a user's document from the database using the unique user id.
/// --> Returns the data from the user document or error object.
/// ////////////////////////////////////////
export const fetchUserDocument = async (uid) => {
  const userRef = firestore.doc(`/users/${uid}`);
  return userRef
    .get()
    .then((userDoc) => {
      if (userDoc.exists) {
        return userDoc.data();
      }
      throw new Error(
        'An error occured. The User document requested does not exist.'
      );
    })
    .catch((err) => {
      throw new Error(err);
    });
};

///
/// ** Fetch a location document **
/// Notes: Fetches a location document from the database using a locationId.
/// --> Returns a location object. On error returns an error object
/// ////////////////////////////////////////
export const fetchLocationDocument = async (locationId) => {
  const locationRef = firestore.doc(`locations/${locationId}`);
  return locationRef
    .get()
    .then((locationDoc) => {
      if (locationDoc.exists) {
        return locationDoc.data();
      }
      throw new Error(
        'An error occured while fetching location document. The requested location document does not exist'
      );
    })
    .catch((err) => {
      throw new Error(err);
    });
};

///
/// ** Fetch all location documents **
/// Notes: Fetches all location documents available in the locations collection.
/// --> Returns an array of location objects.
/// ////////////////////////////////////////
export const fetchAllLocationData = async () => {
  const locationCollectionRef = firestore.collection(`locations`);
  return locationCollectionRef
    .get()
    .then((locationCollection) => {
      // Iterate through the documents within the collection reference.
      const locationsArray = locationCollection.docs.reduce((acc, curr) => {
        acc.push(curr.data()); // Get data from each document and add it to the reducer's accumulated array.
        return acc;
      }, []);
      return locationsArray; // Returns array of location documents.
    })
    .catch((err) => {
      throw new Error(err);
    });
};

///
/// ** Save profile updates to firestore **
/// Notes: Saves updates made to user profile to database.
/// --> Returns nothing.
/// ////////////////////////////////////////
export const updateUserDocument = async (uid, userProfile) => {
  const userRef = firestore.doc(`users/${uid}`);
  return userRef
    .get()
    .then((userDoc) => {
      if (userDoc.exists) {
        const userData = userDoc.data();
        userRef
          .set({
            ...userData,
            ...userProfile,
          })
          .then()
          .catch((error) => {
            throw new Error(
              `Sorry an error occured while updating profile. Error: ${error}`
            );
          });
      } else {
        throw new Error('User document does not exist. Please login again.');
      }
    })
    .catch((error) => {
      throw new Error(error);
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
  // Calculate survey summary details
  const totalSurveyed = Object.keys(survey.data).reduce(
    (acc, key) => acc + survey.data[key],
    0
  );

  const totalActive = Object.keys(survey.data).reduce((acc, key) => {
    const lowerKey = key.toLowerCase();
    if (
      lowerKey.includes('bike') ||
      lowerKey.includes('walk') ||
      lowerKey.includes('roll')
    ) {
      return acc + survey.data[key];
    }
    return acc;
  }, 0);

  const totalInactive = totalSurveyed - totalActive;

  // get location summary data and update with current survey data
  // 1. add survey counts to total survey counts
  // 2. recalculate active transportation score
  // 3. recalculate total amount surveyed

  // Format incoming survey and user data into form acceptable for database.
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
    totalSurveyed,
  };
  console.log(formatted);
  // Create survey document in surveys collection
  // const surveyRef = firestore.collection('/surveys').doc();
  // const firestoreSurvey = { ...formatted, surveyId: surveyRef.id };
  // surveyRef
  //   .set(firestoreSurvey)
  //   .then()
  //   .catch((err) => {
  //     throw new Error(
  //       `An error occured while creating a survey document. ${err}`
  //     );
  //   });
  // Check if a user is associated with the incoming survey.
  // If true, add reference in user's surveys array.
  // If false, do not add a reference to a user's array.
  // if (user) {
  //   const userRef = firestore.doc(`users/${user.uid}`);
  //   userRef
  //     .update({
  //       surveys: firebase.firestore.FieldValue.arrayUnion(
  //         firestore.doc(`surveys/${surveyRef.id}`)
  //       ),
  //     })
  //     .then()
  //     .catch((err) => {
  //       throw new Error(
  //         `An error occured while adding survey reference to user document. ${err}`
  //       );
  //     });
  // }
  // Add reference to survey in location's surveys collection
  // const locationRef = firestore.doc(`locations/${survey.location}`);
  // locationRef
  //   .update({
  //     surveys: firebase.firestore.FieldValue.arrayUnion(
  //       firestore.doc(`surveys/${surveyRef.id}`)
  //     ),
  //   })
  //   .then()
  //   .catch((err) => {
  //     throw new Error(
  //       `An error occured while adding survey reference to location document. ${err}`
  //     );
  //   });
  // return firestoreSurvey; // Return the survey object identical to the database object.
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
    .then()
    .catch((err) => {
      throw new Error(
        `An error occurred when updating survey data cell. ${err}`
      );
    });
};

///
/// ** Delete survey **
/// Notes: Deletes a survey from the database using a surveyId.
/// --> returns nothing (..yet, will have error handling).
/// ////////////////////////////////////////

export const deleteSurvey = async (surveyId) => {
  // Get information about survey that is about to be deleted so other references can also be deleted.
  const surveyRef = firestore.doc(`surveys/${surveyId}`);
  const surveyData = await surveyRef
    .get()
    .then((res) => res.data())
    .catch((err) => {
      console.error(err);
      throw new Error(
        `An error occured while fetching survey document. ${err.message}`
      );
    });

  // List of collections in the db where references need to be deleted when a survey is deleted.
  const updateList = ['user', 'location'];

  // Loop through collections and delete appropriate fields within documents.
  for (let i = 0; i < updateList.length; i += 1) {
    const ref = firestore.doc(`${updateList[i]}s/${surveyData[updateList[i]]}`);
    const data = await ref
      .get()
      .then((res) => res.data())
      .catch((err) => {
        console.error(err);
        throw new Error(
          `An error occured while fetching user document. ${err.message}`
        );
      });

    // filter the survey to be deleted from the list.
    const filteredSurveys = data.surveys.filter(
      (survey) => survey.id !== surveyId
    );

    // update the survey reference array with new filtered reference list.
    ref
      .update({ surveys: filteredSurveys })
      .then((res) => res)
      .catch((err) => {
        console.error(err);
        throw new Error(
          `An error occured when updating user survey array. ${err.message}`
        );
      });
  }

  // Delete the survey document.
  surveyRef
    .delete()
    .then()
    .catch((err) => {
      console.error(err);
      throw new Error(
        `An error occured when deleting the survey document. ${err.message}`
      );
    });
};

///
/// ** Fetch (and optionally format) data for a specific location and direction **
/// Notes: Compiles the numbers for each mode type for all surveys for a specific direction.
/// Graph format: formatted for recharts library (array of objects)
/// Standard format: {[mode]: value, ...}
/// --> Returns a compiled survey object (either in standard or graph format)
/// ////////////////////////////////////////
export const getAllSurveyData = async (locationId, direction, format) => {
  const locationRef = firestore.doc(`locations/${locationId}`);
  const locationData = await locationRef
    .get()
    .then((locationDoc) => locationDoc.data())
    .catch((err) => {
      throw new Error(`An error occured while fetching survey data. ${err} `);
    });

  // iterates through all survey references for the location and uses reduce to add the results for each mode together.
  const tally = await locationData.surveys.reduce(
    async (acc, current) =>
      current
        .get()
        .then((surveyDoc) => {
          const surveyData = surveyDoc.data();
          if (surveyData) {
            surveyData.data[direction].forEach((mode) => {
              acc[mode.name] = (acc[mode.name] || 0) + mode.value;
            });
            return acc;
          }
          return acc;
        })
        .catch((err) => {
          throw new Error(
            `An error occurred when fetching location data. ${err}`
          );
        }),
    {}
  );

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
/// ** Gets a transportation totals for a location **
/// Notes: Takes a locationId and then returns the % of respondants that use active transportation.
/// --> Returns: a decimal value.
/// ////////////////////////////////////////
export const getTransportTotals = async (locationId) => {
  const toData = await getAllSurveyData(locationId, 'to', 'graph');
  const fromData = await getAllSurveyData(locationId, 'from', 'graph');
  if (toData[0].value && fromData[0].value) {
    const bothData = toData.map((mode, index) => ({
      name: mode.name,
      value: (mode.value += fromData[index].value),
    }));
    const totalSurveyed = bothData.reduce((acc, current) => {
      let reassignedAcc = acc;
      reassignedAcc += current.value;
      return reassignedAcc;
    }, 0);
    const totalAt = bothData.reduce((acc, current) => {
      let reassignedAcc = acc;
      switch (current.name) {
        case 'bike':
          reassignedAcc += current.value;
          break;
        case 'walk':
          reassignedAcc += current.value;
          break;
        case 'roll':
          reassignedAcc += current.value;
          break;
        default:
          return reassignedAcc;
      }
      return reassignedAcc;
    }, 0);
    return {
      data: [...bothData],
      activeScore: Math.round((totalAt / totalSurveyed) * 100),
      totalSurveyed,
      totalActive: totalAt,
      totalInactive: totalSurveyed - totalAt,
    };
  }
  return 0;
};

///
/// ** location List with atScore **
/// --> Returns an array of llocation objects with an additional object with combined transportation data.
/// ////////////////////////////////////////

export const locationListWithAdditionalData = async () => {
  const locations = await fetchAllLocationData();
  const promises = [];
  locations.forEach((location) => {
    const additionalDataPromise = getTransportTotals(location.locationId);
    promises.push(additionalDataPromise);
  });
  const newarray = await Promise.all(promises).then((results) => {
    const newLocationArr = results.map((result, idx) => ({
      ...locations[idx],
      totals: { ...result },
    }));
    return newLocationArr;
  });
  return newarray;
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
  await locationRef
    .get()
    .then((locationDoc) => {
      if (!locationDoc.exists) {
        const newLocation = {
          locationId,
          locationAddress: result.place_name,
          locationCoords: result.center,
          locationName: name,
          locationType: type,
          surveys: [],
        };
        locationRef
          .set(newLocation)
          .then()
          .catch((err) => {
            throw new Error(
              `An error occured when creating a new location document. ${err}`
            );
          });
        return newLocation;
      }
      throw new Error('The location already exists in the Modal Database');
    })
    .catch((err) => {
      throw new Error(err);
    });
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
