import React from 'react';

import Card from 'react-bootstrap/Card';
import CardDeck from 'react-bootstrap/CardDeck';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Jumbotron from 'react-bootstrap/Jumbotron';

import GraphBar from '../../assets/graph-bar.svg';
import Group from '../../assets/group.svg';
import Support from '../../assets/support.svg';

const InfoCardSection = () => (
  <Jumbotron className="mt-3 text-center">
    <Row>
      <Col>
        <h2 className="mb-5 display-4">How Modal works</h2>
      </Col>
    </Row>
    <Row>
      <Col>
        <CardDeck>
          <Card className="text-center shadow">
            <Card.Img
              className="pt-3 mx-auto"
              variant="top"
              src={Group}
              style={{ height: '100px', width: '100px' }}
            />
            <Card.Body>
              <Card.Title className="mb-3">Gather your students</Card.Title>
              <Card.Text>
                A Modal hands up survey can be done anytime during the school
                day with all class sizes.
              </Card.Text>
            </Card.Body>
          </Card>
          <Card className="text-center shadow">
            <Card.Img
              className="pt-3 mx-auto"
              variant="top"
              src={Support}
              style={{ height: '100px', width: '100px' }}
            />
            <Card.Body>
              <Card.Title>Do a 30 second survey</Card.Title>
              <Card.Text>
                A simple hands-up survey asking your class how they travelled to
                school today and how they plan on travelling home.
              </Card.Text>
            </Card.Body>
          </Card>
          <Card className="text-center shadow">
            <Card.Img
              className="pt-3 mx-auto"
              variant="top"
              src={GraphBar}
              style={{ height: '100px', width: '100px' }}
            />
            <Card.Body>
              <Card.Title>See your mode split</Card.Title>
              <Card.Text>
                See your mode split today and analyse how it changes it over
                time.
              </Card.Text>
            </Card.Body>
          </Card>
        </CardDeck>
      </Col>
    </Row>
  </Jumbotron>
);

export default InfoCardSection;
