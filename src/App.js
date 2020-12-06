import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import firebase, { fetchUserDocument } from './firebase/firebase.utils';

import { UserContext } from './contexts/user.context';
import { AlertContext } from './contexts/alert.context';

import AlertList from './components/alert-list/alert-list.component';
import Navigation from './components/navbar/navbar.component';
import Footer from './components/footer/footer.component';

import HomePage from './pages/home-page/home-page.component';
import LoginPage from './pages/login-page/login-page.component';
import ProfilePage from './pages/profile-page/profile-page.component';
import LocationPage from './pages/location-page/location-page.component';
import AddLocationPage from './pages/add-location-page/add-location-page.component';
import LocationListPage from './pages/location-list-page/location-list-page.component';
import SurveyPage from './pages/survey-page/survey-page.component';
import NotFoundPage from './pages/not-found-page/not-found-page.component';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [alerts, setAlerts] = useState([]);

  const handleDismissAlert = (idx) => {
    const alertList = [...alerts];
    alertList.splice(idx, 1);
    setAlerts(alertList);
  };

  useEffect(() => {
    firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        const userDoc = await fetchUserDocument(user.uid);
        setCurrentUser({
          ...userDoc,
        });
        setAlerts([
          ...alerts,
          { type: 'success', message: 'Sign in successful.' },
        ]);
      } else {
        setCurrentUser(null);
      }
    });
  }, []);

  return (
    <div className="App">
      <AlertContext.Provider value={[alerts, setAlerts]}>
        <Container className="main-container" fluid="xl">
          <Router>
            <UserContext.Provider value={currentUser}>
              <Navigation />
              {alerts ? (
                <AlertList
                  alerts={alerts}
                  handleDismissAlert={handleDismissAlert}
                />
              ) : null}
              <Switch>
                <Route exact path="/" component={HomePage} />
                <Route path="/login" component={LoginPage} />
                <Route path="/profile" component={ProfilePage} />
                <Route exact path="/locations" component={LocationListPage} />
                <Route path="/location/:id" component={LocationPage} />
                <Route path="/add-location" component={AddLocationPage} />
                <Route path="/survey" component={SurveyPage} />
                <Route path="*" component={NotFoundPage} />
              </Switch>
              <Footer />
            </UserContext.Provider>
          </Router>
        </Container>
      </AlertContext.Provider>
    </div>
  );
};

export default App;
