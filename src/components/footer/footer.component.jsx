import React from 'react';
import { Link } from 'react-router-dom';

import Container from 'react-bootstrap/Container';

import { ReactComponent as Logo } from '../../assets/m.svg';

const Footer = () => (
  <Container
    className="footer d-flex flex-column align-items-center justify-content-center"
    fluid="xl"
  >
    <Link className="mb-2">
      <Logo style={{ width: '40px', height: '40px' }} />
    </Link>
    <p className="text-center">Modal a project by Alex Ricci</p>
  </Container>
);

export default Footer;
