import React, { useContext } from 'react';
import propTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import firebase from '../../firebase/firebase.utils';

import { UserContext } from '../../contexts/user.context';

import { ReactComponent as Logo } from '../../assets/ko-fi.svg';

const Navigation = ({ history }) => {
  const currentUser = useContext(UserContext);

  const handleSignOut = () => {
    firebase.auth().signOut();
    history.push('/');
  };

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
            <Button
              className="mr-xl-2 mb-2 mb-xl-0"
              onClick={() => history.push('/survey')}
              variant="success"
            >
              Start a survey
            </Button>
            <ButtonGroup>
              <Button
                onClick={() => history.push('/profile')}
                variant="primary"
              >
                Profile
              </Button>
              <Button onClick={handleSignOut} variant="danger">
                Sign Out
              </Button>
            </ButtonGroup>
          </Nav>
        ) : (
          <Nav className="ml-auto">
            <Button
              onClick={() => history.push('/login')}
              className="mr-xl-2 mb-2 mb-xl-0"
              variant="outline-primary"
            >
              Sign In
            </Button>
            <Button onClick={() => history.push('/login')} variant="primary">
              Create Account
            </Button>
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
