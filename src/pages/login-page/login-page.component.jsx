import React from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase, { uiConfig } from '../../firebase/firebase.utils';

import './login-page.styles.scss';

const LoginPage = () => (
  <div className="login">
    <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
  </div>
);

export default LoginPage;
