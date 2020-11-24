import React from 'react';
import { Link } from 'react-router-dom';

import Card from 'react-bootstrap/Card';
import CardDeck from 'react-bootstrap/CardDeck';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Image from 'react-bootstrap/Image';

import GraduationCap from '../../assets/graduation-cap.svg';
import HandPaper from '../../assets/hand-paper-o.svg';
import LineChart from '../../assets/line-chart.svg';

const InfoCardSection = () => (
  <Container className="mt-5">
    <Row>
      <h2 className="pl-3 mb-4">How it works</h2>
    </Row>
    <Row>
      <Col>
        <CardDeck>
          <Card>
            <Card.Body>
              <Card.Title className="mb-3">
                Choose your school from the list
              </Card.Title>
              <Form.Control as="select" className="mb-3">
                <option>1</option>
                <option>1</option>
                <option>1</option>
                <option>1</option>
                <option>1</option>
                <option>1</option>
              </Form.Control>
              <Card.Text>
                Don't see it? <Link to="/add-location">Add a school</Link>
              </Card.Text>
            </Card.Body>
          </Card>
          <Card>
            <Card.Body>
              <Card.Title>Do a 30 second survey</Card.Title>
              <Card.Text>
                A simple hands-up survey asking your class how they traveled to
                school today and how they plan on travelling home.
              </Card.Text>
            </Card.Body>
          </Card>
          <Card>
            <Card.Body>
              <Card.Title>See your Mode Split</Card.Title>
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
