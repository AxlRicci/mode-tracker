import React from 'react';
import Container from 'react-bootstrap/Container';
import TrackerForm from '../../components/tracker-form/tracker-form.component';

const SurveyPage = () => (
  <Container className="mt-3">
    <h1 className="display-4 mb-2">Hands Up Survey</h1>
    <TrackerForm />
  </Container>
);

export default SurveyPage;
