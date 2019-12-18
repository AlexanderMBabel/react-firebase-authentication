import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import { SignUpLink } from '../components/SignUp';
import { withFirebase } from './Firebase/context';
import * as ROUTES from '../constants/routes';
import history from '../history';

const SignIn = () => {
  return (
    <div>
      <h1>Sign In</h1>
      <SignInForm />
      <SignUpLink />
    </div>
  );
};

const SignInFormBase = ({ firebase }) => {
  const initialState = {
    email: '',
    password: '',
    error: null
  };
  const [formData, setFormdata] = useState(initialState);
  const { email, password, error } = formData;

  const submitHandler = e => {
    firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        setFormdata(initialState);
        history.push(ROUTES.HOME);
      })
      .catch(error => {
        const tempData = { ...formData };
        tempData.error = error;
        setFormdata(tempData);
      });
    e.preventDefault();
  };

  const changeHandler = e => {
    const tempData = { ...formData };
    tempData[e.target.name] = e.target.value;
    setFormdata(tempData);
  };

  const isInvalid = password === '' || email === '';

  return (
    <div>
      <form onSubmit={submitHandler}>
        <input
          name='email'
          value={formData.email}
          onChange={changeHandler}
          type='email'
          placeholder='Email'
        />
        <input
          name='password'
          value={formData.password}
          onChange={changeHandler}
          type='password'
          placeholder='password'
        />
        <button disabled={isInvalid} type='submit'>
          Sign In
        </button>
        {error && <p>{error.message}</p>}
      </form>
    </div>
  );
};

const SignInForm = compose(withRouter, withFirebase)(SignInFormBase);
export default SignIn;

export { SignInForm };
