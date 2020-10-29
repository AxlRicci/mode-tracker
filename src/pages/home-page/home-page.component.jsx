import React from 'react';

import TrackerForm from '../../components/tracker-form/tracker-form.component';

import './home-page.styles.scss';

const HomePage = () => (
  <div className="home">
    <h1 className="home__heading">Mode Tracker!</h1>
    <TrackerForm />
  </div>
);

export default HomePage;
