import React, { useContext } from 'react';
import propTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

import { UserContext } from '../../contexts/user.context';

import { ReactComponent as Logo } from '../../assets/ko-fi.svg';

import './navbar.styles.scss';

const Navigation = ({ history }) => {
  // const currentUser = useContext(UserContext);
  const currentUser = null;

  return (
    <Navbar bg="white" expand="xl">
      <Navbar.Brand as={Link} to="/">
        Modal
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link as={Link} to="/">
            Home
          </Nav.Link>
          <Nav.Link as={Link} to="/locations">
            Schools
          </Nav.Link>
          <Nav.Link as={Link} to="/about">
            About
          </Nav.Link>
        </Nav>
        {currentUser ? (
          <Nav className="ml-auto">
            <Button onClick={() => history.push('/survey')} variant="success">
              Start a survey
            </Button>
          </Nav>
        ) : (
          <Nav className="ml-auto">
            <Button className="mr-2 mb-2 mb-lg-0" variant="outline-primary">
              Sign In
            </Button>
            <Button variant="primary">Create Account</Button>
          </Nav>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
};

Navigation.propTypes = {
  history: propTypes.object,
};

export default withRouter(Navigation);
