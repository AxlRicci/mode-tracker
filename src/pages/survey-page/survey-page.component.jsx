import React from 'react';
import Container from 'react-bootstrap/Container';
import TrackerForm from '../../components/tracker-form/tracker-form.component';

const SurveyPage = () => (
  <Container>
    <h1>Do a quick hands up survey.</h1>
    <TrackerForm />
  </Container>
);

export default SurveyPage;
