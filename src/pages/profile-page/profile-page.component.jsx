import React, { useContext, useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';

import ProfileDetails from '../../components/profile-details/profile-details.component';
import SurveyList from '../../components/survey-list/survey-list.component';

import { UserContext } from '../../contexts/user.context';

import { updateUserDocument } from '../../firebase/firebase.utils';

const ProfilePage = () => {
  const user = useContext(UserContext);

  const [userProfile, setUserProfile] = useState({
    uid: '',
    displayName: '',
    location: '',
    grade: '',
  });

  useEffect(() => {
    if (user) {
      setUserProfile({
        uid: user.uid,
        displayName: user.displayName,
        location: user.location,
        grade: user.grade || '1',
      });
    }
  }, [user]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserProfile({
      ...userProfile,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    updateUserDocument(user.uid, userProfile);
  };

  if (userProfile) {
    return (
      <Container fluid>
        <ProfileDetails
          additionalClasses="mb-4"
          userProfile={userProfile}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
        <h3 className="mb-3">Recent Surveys</h3>
        <SurveyList
          query={{ field: 'user', value: userProfile.uid }}
          editable
        />
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
