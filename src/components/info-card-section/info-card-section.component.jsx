import React from 'react';

import Card from 'react-bootstrap/Card';
import CardDeck from 'react-bootstrap/CardDeck';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

const InfoCardSection = () => (
  <Container className="mt-3">
    <Row>
      <h2 className="pl-3 mb-4 display-4">How it works</h2>
    </Row>
    <Row>
      <Col>
        <CardDeck>
          <Card>
            <Card.Body>
              <Card.Title className="mb-3">1. Gather your students</Card.Title>
              <Card.Text>
                A Modal hands up survey can be done anytime during the school
                day with all class sizes.
              </Card.Text>
            </Card.Body>
          </Card>
          <Card>
            <Card.Body>
              <Card.Title>2. Do a 30 second survey</Card.Title>
              <Card.Text>
                A simple hands-up survey asking your class how they traveled to
                school today and how they plan on travelling home.
              </Card.Text>
            </Card.Body>
          </Card>
          <Card>
            <Card.Body>
              <Card.Title>3. See your Mode Split</Card.Title>
              <Card.Text>
                See your mode split today and analyse how it changes it over
                time.
              </Card.Text>
            </Card.Body>
          </Card>
        </CardDeck>
      </Col>
    </Row>
  </Container>
);

export default InfoCardSection;
