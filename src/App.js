import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import firebase from './firebase/firebase.utils';

import { UserContext } from './contexts/user.context';

import HomePage from './pages/home-page/home-page.component';
import LoginPage from './pages/login-page/login-page.component';

import './App.css';

const App = () => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setCurrentUser({
          ...user,
        });
      }
    });
  }, []);

  return (
    <div className="App">
      <Router>
        <Switch>
          <UserContext.Provider value={currentUser}>
            <Route exact path="/" component={HomePage} />
          </UserContext.Provider>
          <Route path="/login" component={LoginPage} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
