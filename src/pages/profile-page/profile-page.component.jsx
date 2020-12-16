import React, { useContext, useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Jumbotron from 'react-bootstrap/Jumbotron';

import ProfileDetails from '../../components/profile-details/profile-details.component';
import SurveyList from '../../components/survey-list/survey-list.component';

import { AlertContext } from '../../contexts/alert.context';
import { UserContext } from '../../contexts/user.context';

import { updateUserDocument } from '../../firebase/firebase.utils';

const ProfilePage = () => {
  const [currentUser, setCurrentUser] = useContext(UserContext);
  const [alerts, setAlerts] = useContext(AlertContext);

  const [userProfile, setUserProfile] = useState({
    uid: '',
    displayName: '',
    location: '',
    grade: '',
  });

  useEffect(() => {
    if (currentUser) {
      setUserProfile({
        uid: currentUser.uid,
        displayName: currentUser.displayName,
        location: currentUser.location,
        grade: currentUser.grade || '1',
      });
    }
  }, [currentUser]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserProfile({
      ...userProfile,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    updateUserDocument(currentUser.uid, userProfile)
      .then(() => {
        setCurrentUser({ ...userProfile });
        setAlerts([
          ...alerts,
          { type: 'success', message: 'Profile details successfully saved.' },
        ]);
      })
      .catch((error) => {
        setAlerts([...alerts, { type: 'fail', message: error.message }]);
      });
  };

  if (userProfile) {
    return (
      <Container className="mt-3" fluid>
        <ProfileDetails
          additionalClasses="mb-4"
          userProfile={userProfile}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
        <Jumbotron className="">
          <h3 className="mb-5 display-4 text-center text-md-left">
            Recent Surveys
          </h3>
          <SurveyList
            query={{ field: 'user', value: userProfile.uid }}
            editable
          />
        </Jumbotron>
      </Container>
    );
  }
  return (
    <div className="profile-page">
      <h1>loading...</h1>
    </div>
  );
};

export default ProfilePage;

// <div className="profile-page">
//         <FormInput
//           label="Display Name"
//           name="displayName"
//           handleChange={handleChange}
//           value={userProfile.displayName}
//         />
//         <FormSelect
//           name="location"
//           label="School"
//           handleChange={handleChange}
//           value={userProfile.location}
//           options={locations}
//           optionKey="locationId"
//           optionValue="locationId"
//           optionLabelMain="locationName"
//           optionLabelDesc="locationAddress"
//         />
//         <FormSelect
//           name="grade"
//           label="Grade"
//           handleChange={handleChange}
//           value={userProfile.grade}
//           options={gradeOptions}
//         />
//         <button type="button" onClick={handleSubmit}>
//           Save
//         </button>
//       </div>
