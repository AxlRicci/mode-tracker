import React from 'react';
import propTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import HeroSection from '../../components/hero-section/hero-section.component';
import InfoCardSection from '../../components/info-card-section/info-card-section.component';
import CtaSection from '../../components/cta-section/cta-section.component';

const HomePage = ({ history }) => (
  <div className="home-page">
    <HeroSection additionalClasses="home-page__hero" />
    <InfoCardSection />
    <CtaSection
      heading="Take Modal For A Spin"
      subheading="Try Modal now, do a 30-second practice survey"
      buttonLabel="Try a Practice Survey"
    />
  </div>
);

HomePage.propTypes = {
  history: propTypes.object,
};

export default withRouter(HomePage);
