import React, { useState, useEffect } from 'react';

//Router
import { Router, Route } from 'react-router-dom';

//components
import Navigation from './components/Navigation';
import LandingPage from './components/Landing';
import SignUpPage from './components/SignUp';
import SignInPage from './components/SignIn';
import PasswordForgetPage from './components/PasswordForget';
import HomePage from './components/Home';
import AccountPage from './components/Account';
import AdminPage from './components/Admin';
import history from './history';

import * as ROUTES from './constants/routes';
//context
import { withFirebase } from './components/Firebase/context';
import AuthUserContext from './components/Sessions/context';

const App = ({ firebase }) => {
  const [authUser, setAuthUser] = useState(null);
  useEffect(() => {
    firebase.auth.onAuthStateChanged(authUser => {
      authUser ? setAuthUser(authUser) : setAuthUser(null);
    });
  }, [firebase.auth]);

  return (
    <AuthUserContext.Provider value={authUser}>
      <Router history={history}>
        <Navigation />

        <hr />
        <Route exact path={ROUTES.LANDING} component={LandingPage} />
        <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
        <Route path={ROUTES.SIGN_IN} component={SignInPage} />
        <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
        <Route path={ROUTES.HOME} component={HomePage} />
        <Route path={ROUTES.ACCOUNT} component={AccountPage} />
        <Route path={ROUTES.ADMIN} component={AdminPage} />
      </Router>
    </AuthUserContext.Provider>
  );
};

export default withFirebase(App);
