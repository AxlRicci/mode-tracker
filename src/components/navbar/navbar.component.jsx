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
import { AlertContext } from '../../contexts/alert.context';

import { ReactComponent as Logo } from '../../assets/m.svg';

const Navigation = ({ history }) => {
  const [currentUser, setCurrentUser] = useContext(UserContext);
  const [alerts, setAlerts] = useContext(AlertContext);

  const handleSignOut = () => {
    firebase.auth().signOut();
    history.push('/');
    setAlerts([
      ...alerts,
      { type: 'success', message: 'Sign out successful.' },
    ]);
  };

  return (
    <Navbar bg="white" expand="xl">
      <Navbar.Brand as={Link} to="/">
        <Logo style={{ width: '40px', height: '40px' }} />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link as={Link} to="/">
            Home
          </Nav.Link>
          <NavDropdown title="Schools">
            <NavDropdown.Item as={Link} to="/locations">
              School List
            </NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/add-location">
              Add a school
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
        {currentUser ? (
          <Nav className="ml-auto">
            <Button
              className="mr-xl-2 mb-2 mb-xl-0"
              onClick={() => history.push('/survey')}
              variant="primary"
            >
              Start A Survey
            </Button>
            <NavDropdown title="Profile">
              <NavDropdown.Item as={Link} to="/profile">
                Profile
              </NavDropdown.Item>
              <NavDropdown.Item onClick={handleSignOut}>
                SignOut
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        ) : (
          <Nav className="ml-auto">
            <Button onClick={() => history.push('/login')} variant="primary">
              Sign In
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
