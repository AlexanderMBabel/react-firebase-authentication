import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import history from '../history';

import { withFirebase } from './Firebase/context';
import * as ROUTES from '../constants/routes';
import { compose } from 'recompose';

const SignUp = () => (
  <div>
    <h1> sign up</h1>
    <SignUpForm />
  </div>
);

const SignUpFormBase = ({ firebase }) => {
  const initialFormData = {
    name: '',
    email: '',
    password1: '',
    password2: '',
    error: null
  };
  const [formData, setFormData] = useState(initialFormData);
  const submitHandler = e => {
    e.preventDefault();
    const { email, password1 } = formData;
    firebase
      .doCreateUserWithEmailAndPassword(email, password1)
      .then(authUser => {
        setFormData(initialFormData);
        history.push(ROUTES.HOME);
      })
      .catch(error => {
        const tempData = formData;
        tempData.error = error;
        setFormData(tempData);
      });
  };
  const changeHandler = e => {
    const tempData = { ...formData };
    tempData[e.target.name] = e.target.value;
    setFormData(tempData);
  };
  const { password2, password1, email, name, error } = formData;
  const isInvalid =
    password1 !== password2 || password1 === '' || email === '' || name === '';
  return (
    <form onSubmit={submitHandler}>
      <input
        type='text'
        value={formData.name}
        name='name'
        placeholder='name'
        onChange={changeHandler}
      />
      <input
        type='email'
        value={formData.email}
        name='email'
        placeholder='email'
        onChange={changeHandler}
      />
      <input
        type='password'
        value={formData.password1}
        name='password1'
        placeholder='password'
        onChange={changeHandler}
      />
      <input
        type='password'
        value={formData.password2}
        name='password2'
        placeholder='repeat password'
        onChange={changeHandler}
      />
      <button disabled={isInvalid} type='submit'>
        Sign Up
      </button>
      {error && <p>{error.message}</p>}
    </form>
  );
};

const SignUpLink = () => (
  <p>
    Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
  </p>
);

const SignUpForm = compose(withRouter, withFirebase)(SignUpFormBase);

export default SignUp;

export { SignUpForm, SignUpLink };
