import React, { useContext } from 'react';

import { UserContext } from '../../contexts/user.context';

import TrackerForm from '../../components/tracker-form/tracker-form.component';
import SurveyList from '../../components/survey-list/survey-list.component';

import './home-page.styles.scss';

const HomePage = () => {
  const user = useContext(UserContext);

  if (user) {
    return (
      <div className="home">
        <h1 className="home__heading">
          Welcome, {user.displayName} to the Mode Tracker!
        </h1>
        <TrackerForm />
        <SurveyList />
      </div>
    );
  }
  return (
    <div className="home">
      <h1>LOADING...</h1>
    </div>
  );
};

export default HomePage;
