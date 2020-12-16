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

/// ** Configuration for Firebase auth ui **
export const uiConfig = {
  callbacks: {
    signInSuccessWithAuthResult: () => true,
  },
  signInSuccessUrl: '/profile',
  signInFlow: 'popup',
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
  ],
};

/// firestore utility functions
/// ///////////////////////////////////////////////////////////////////////////////////////

/// ** login process for new and existing users **
/// Notes: Runs everytime a user signs in.
/// If a user does not exist in the database, the function will create a new record for that user.
/// Then fetches user data from the database and updates user context.
/// --> Retuns a user object
/// /////////////////////////////////////
export const userLogin = async (user) => {
  const userRef = firestore.doc(`users/${user.uid}`);
  await userRef
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
            grade: '',
            location: '',
          })
          .then()
          .catch((err) => {
            console.error(err);
          });
      }
    })
    .catch((err) => {
      console.error(err);
    });

  const userDocument = await userRef
    .get()
    .then((userDoc) => userDoc.data())
    .catch((err) => {
      console.error(err);
    });
  return userDocument; // Returns the user data incase it is needed.
};

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

/// ** Fetch user profile data **
/// Notes: Fetches a user's document from the database using the unique user id.
/// --> Returns the data from the user document or error object.
/// ////////////////////////////////////////
export const fetchUserDocument = async (uid) => {
  const userRef = firestore.doc(`users/${uid}`);
  return userRef
    .get()
    .then((userDoc) => {
      if (userDoc.exists) {
        return userDoc.data();
      }
      throw new Error(
        'An error occured. The User document requested does not exist. Please log in again'
      );
    })
    .catch((err) => {
      throw new Error(err);
    });
};

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
          summary: {
            activeScore: 0,
            totalActive: 0,
            totalInactive: 0,
            totalSurveyed: 0,
            data: [
              { name: 'bike', value: 0 },
              { name: 'walk', value: 0 },
              { name: 'roll', value: 0 },
              { name: 'schoolbus', value: 0 },
              { name: 'publicTrans', value: 0 },
              { name: 'car', value: 0 },
            ],
          },
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

/// ** Map all documents in a collection **
/// Notes: Takes a collection reference and iterates through all documents fetching data for each.
/// --> Returns an array of document objects.
/// ////////////////////////////////////////
export const collectionRefToMap = async (collection) => {
  const documents = collection.docs;
  const collectionMap = await documents.map((document) => document.data());
  return collectionMap;
};

const getActiveCount = (combinedModeCounts) =>
  combinedModeCounts.reduce((acc, mode) => {
    if (mode.name === 'bike' || mode.name === 'walk' || mode.name === 'roll') {
      return acc + mode.value;
    }
    return acc;
  }, 0);

const getSurveyedCount = (combinedModeCounts) =>
  combinedModeCounts.reduce((acc, mode) => acc + mode.value, 0);

const getInactiveCount = (activeCount, totalCount) => totalCount - activeCount;

const getActiveScore = (activeCount, totalSurveyedCount) =>
  activeCount / totalSurveyedCount;

/// ** Submit survey form to database **
/// Notes: Takes a survey object and user object, varifies and formats the data and then makes multiple entries in the database.
/// Entry 1: A survey document with the formatted survey is created in the surveys collection
/// Entry 2: A reference (to the survey document) is added to the associated location document in the surveys array.
/// Entry 3: A reference (to the survey document) is added to the associated user document in the surveys array.
/// Entry 3 Note: If a user is not signed in, the reference will not be added to a user document and the userId of the survey will be set to 'anonymous'
/// --> Returns the survey object formatted just as it is in the database.
/// ////////////////////////////////////////
export const createNewSurveyDocument = async (survey, user) => {
  //* 1. Calculate survey summary details

  // Calculate the total amount of answers for the survey.
  const totalSurveyed = Object.keys(survey.data).reduce(
    (acc, key) => acc + survey.data[key],
    0
  );

  // Combine mode counts from both to and from directions. Output an array of objects.
  const combinedSurveyModeCounts = Object.keys(survey.data).reduce(
    (allModes, key) => {
      const mode = key.slice(2).charAt(0).toLowerCase() + key.slice(3);
      const modeIndex = allModes.map((e) => e.name).indexOf(mode);
      if (modeIndex !== -1) {
        // if object exists update value in list
        allModes[modeIndex] = {
          ...allModes[modeIndex],
          value: (allModes[modeIndex].value += survey.data[key]),
        };
      } else {
        // if object does not exist in list create new object
        allModes.push({
          name: mode,
          value: survey.data[key],
        });
      }
      return allModes;
    },
    []
  );

  // Calculate the total number who use active modes (bike, walk, or roll)
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

  // Calculate the total number that use inactive modes (schoolbus, publicTrans, car)
  const totalInactive = totalSurveyed - totalActive;

  // Calculate the active transportation score. % who use active transportation.
  const activeScore = totalSurveyed ? totalActive / totalSurveyed : 0;

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
    summary: {
      totalSurveyed,
      totalActive,
      totalInactive,
      activeScore,
    },
  };

  //* Create survey document in surveys collection
  const surveyRef = firestore.collection('/surveys').doc();
  const firestoreSurvey = { ...formatted, surveyId: surveyRef.id };
  surveyRef
    .set(firestoreSurvey)
    .then()
    .catch((err) => {
      throw new Error(
        `An error occured while creating a survey document. ${err}`
      );
    });

  //* Add reference in user's surveys array.
  // First, check if a user is associated with the incoming survey.
  if (user) {
    const userRef = firestore.doc(`users/${user.uid}`);
    userRef
      .update({
        surveys: firebase.firestore.FieldValue.arrayUnion(
          firestore.doc(`surveys/${surveyRef.id}`)
        ),
      })
      .then()
      .catch((err) => {
        throw new Error(
          `An error occured while adding survey reference to user document. ${err}`
        );
      });
  }

  //* Update summary data for location and add reference to survey.
  const locationRef = firestore.doc(`locations/${survey.location}`);
  locationRef
    .get()
    .then((res) => {
      const locationData = res.data();
      const { summary } = locationData;

      // add survey counts to totals
      const newModeCountTotals = summary.data.map((mode) => {
        const modeIndex = combinedSurveyModeCounts
          .map((e) => e.name)
          .indexOf(mode.name);
        return {
          name: mode.name,
          value: mode.value + combinedSurveyModeCounts[modeIndex].value,
        };
      });

      // recalculate total amount surveyed
      const newTotalSurveyed = summary.totalSurveyed + totalSurveyed;
      const newTotalActive = summary.totalActive + totalActive;
      const newTotalInactive = summary.totalInactive + totalInactive;
      const newActiveScore =
        newTotalSurveyed > 0 ? newTotalActive / newTotalSurveyed : 0;

      console.log(
        newTotalSurveyed,
        newTotalActive,
        newTotalInactive,
        newActiveScore
      );

      // update location document with new data;
      locationRef
        .update({
          summary: {
            activeScore: newActiveScore,
            totalActive: newTotalActive,
            totalInactive: newTotalInactive,
            totalSurveyed: newTotalSurveyed,
            data: newModeCountTotals,
          },
          surveys: firebase.firestore.FieldValue.arrayUnion(
            firestore.doc(`surveys/${surveyRef.id}`)
          ),
        })
        .then()
        .catch((err) => {
          console.error(err);
          throw new Error(
            `An error occured while updating the location document. ${err}`
          );
        });
    })
    .catch((err) => {
      console.error(err);
      throw new Error(
        `An error occured while fetching location document. ${err}`
      );
    });
  return firestoreSurvey; // Return the survey object identical to the database object.
};

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
  const surveyData = await surveyRef
    .get()
    .then((res) => res.data())
    .catch((err) => {
      console.error(err);
    });

  const locationRef = firestore.doc(`locations/${surveyData.location}`);
  const locationData = await locationRef
    .get()
    .then((res) => res.data())
    .catch((err) => {
      console.error(err);
    });

  // Recalculate the mode counts for the location summary data.
  const indexOfLocationMode = locationData.summary.data
    .map((e) => e.name)
    .indexOf(name);

  const indexOfSurveyMode = surveyData.data[direction]
    .map((e) => e.name)
    .indexOf(name);

  const updatedLocationSummaryModeValue =
    locationData.summary.data[indexOfLocationMode].value -
    surveyData.data[direction][indexOfSurveyMode].value +
    value;

  const updatedLocationSummaryData = locationData.summary.data.map((mode) => {
    if (mode.name === name) {
      return { ...mode, value: updatedLocationSummaryModeValue };
    }
    return mode;
  });

  // update the survey with new value.
  const updatedSurveyDirectionData = surveyData.data[direction].map((mode) => {
    if (mode.name === name && mode.value !== value) {
      return { name, value };
    }
    return mode;
  });

  const oppositeDirection = direction === 'to' ? 'from' : 'to';
  console.log(direction, oppositeDirection);

  // Compile mode counts from both directions for summary recalculations.
  const allSurveyData = [
    ...updatedSurveyDirectionData,
    ...surveyData.data[oppositeDirection],
  ];

  console.log(updatedSurveyDirectionData, allSurveyData);

  // const getActiveCount = (combinedModeCounts) =>
  //   combinedModeCounts.reduce((acc, mode) => {
  //     if (
  //       mode.name === 'bike' ||
  //       mode.name === 'walk' ||
  //       mode.name === 'roll'
  //     ) {
  //       return acc + mode.value;
  //     }
  //     return acc;
  //   }, 0);

  // const getSurveyedCount = (combinedModeCounts) =>
  //   combinedModeCounts.reduce((acc, mode) => acc + mode.value, 0);

  // const getInactiveCount = (activeCount, totalCount) =>
  //   totalCount - activeCount;

  // const getActiveScore = (activeCount, totalSurveyedCount) =>
  //   activeCount / totalSurveyedCount;

  // Recalculate summary stats for locationDocument.
  const updatedLocationTotalSurveyed = getSurveyedCount(
    updatedLocationSummaryData
  );

  const updatedLocationTotalActive = getActiveCount(updatedLocationSummaryData);

  const updatedLocationTotalInactive = getInactiveCount(
    updatedLocationTotalActive,
    updatedLocationTotalSurveyed
  );

  const updatedLocationActiveScore = getActiveScore(
    updatedLocationTotalActive,
    updatedLocationTotalSurveyed
  );

  // Recalculate summary statistics for survey document.
  const updatedSurveyTotalSurveyed = getSurveyedCount(allSurveyData);

  const updatedSurveyTotalActive = getActiveCount(allSurveyData);

  const updatedSurveyTotalInactive = getInactiveCount(
    updatedSurveyTotalActive,
    updatedSurveyTotalSurveyed
  );

  const updatedSurveyActiveScore = getActiveScore(
    updatedSurveyTotalActive,
    updatedSurveyTotalSurveyed
  );

  const updatedSurveyDoc = {
    ...surveyData,
    data: {
      ...surveyData.data,
      [direction]: [
        ...surveyData.data[direction].map((mode) => {
          if (mode.name === name) {
            return { name, value };
          }
          return mode;
        }),
      ],
    },
    summary: {
      activeScore: updatedSurveyActiveScore,
      totalActive: updatedSurveyTotalActive,
      totalInactive: updatedSurveyTotalInactive,
      totalSurveyed: updatedSurveyTotalSurveyed,
    },
  };

  const updatedLocationDoc = {
    ...locationData,
    summary: {
      data: updatedLocationSummaryData,
      activeScore: updatedLocationActiveScore,
      totalActive: updatedLocationTotalActive,
      totalInactive: updatedLocationTotalInactive,
      totalSurveyed: updatedLocationTotalSurveyed,
    },
  };
  // set update locations and iterate through the array to update.
  const updateLocations = [surveyRef, locationRef];
  updateLocations.forEach((reference) => {
    let updateDoc = null;
    if (reference === surveyRef) {
      updateDoc = updatedSurveyDoc;
    } else if (reference === locationRef) {
      updateDoc = updatedLocationDoc;
    }
    reference
      .update(updateDoc)
      .then()
      .catch((err) => console.error(err));
  });
};

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

  // get location document reference and data. calculate necessary changes and update location document.
  const locationRef = firestore.doc(`locations/${surveyData.location}`);
  const locationData = await locationRef
    .get()
    .then((res) => res.data())
    .catch((err) => {
      console.error(err);
      throw new Error(
        `An error occured while fetching location document. ${err.message}`
      );
    });

  // filter the survey to be deleted from the list.
  const filteredLocationSurveys = locationData.surveys.filter(
    (survey) => survey.id !== surveyId
  );

  // calculate the new summary data values (old mode value - mode value from survey being deleted)
  const updatedSummaryModeData = locationData.summary.data.map((mode) => {
    const modeIndexTo = surveyData.data.to
      .map((surveyModeTo) => surveyModeTo.name)
      .indexOf(mode.name);
    const modeIndexFrom = surveyData.data.from
      .map((surveyModeFrom) => surveyModeFrom.name)
      .indexOf(mode.name);
    return {
      name: mode.name,
      value:
        mode.value -
        (surveyData.data.to[modeIndexTo].value +
          surveyData.data.from[modeIndexFrom].value),
    };
  });

  const updatedTotalSurveyed = getSurveyedCount(updatedSummaryModeData);
  const updatedActiveCount = getActiveCount(updatedSummaryModeData);
  const updatedInactiveCount = getInactiveCount(
    updatedActiveCount,
    updatedTotalSurveyed
  );
  const updatedActiveScore = getActiveScore(
    updatedActiveCount,
    updatedTotalSurveyed
  );

  // update the survey reference array with new filtered reference list.
  locationRef
    .update({
      summary: {
        activeScore: updatedActiveScore || 0,
        data: [...updatedSummaryModeData],
        totalActive: updatedActiveCount,
        totalInactive: updatedInactiveCount,
        totalSurveyed: updatedTotalSurveyed,
      },
      surveys: filteredLocationSurveys,
    })
    .then((res) => res)
    .catch((err) => {
      console.error(err);
      throw new Error(
        `An error occured when updating user survey array. ${err.message}`
      );
    });

  // if user is associated with survey. fetch user document reference and data and calculate necessary changes and update user document.
  if (!surveyData.user === 'anonymous') {
    const userRef = firestore.doc(`users/${surveyData.user}`);
    const userData = await userRef
      .get()
      .then((res) => res.data())
      .catch((err) => {
        console.error(err);
        throw new Error(
          `An error occured while fetching user document. ${err.message}`
        );
      });

    const filteredUserSurveys = userData.surveys.filter(
      (survey) => survey.id !== surveyId
    );
    // update the survey reference array with new filtered reference list.
    userRef
      .update({
        surveys: filteredUserSurveys,
      })
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

export default firebase;
