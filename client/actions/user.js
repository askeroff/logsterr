import axios from 'axios';
import {
  LOG_OUT,
  LOG_IN,
  IS_LOGGED_IN,
  SIGN_UP,
  LOG_IN_ERROR,
  SIGN_UP_ERROR,
} from './actionTypes';

export function logInSuccess(user) {
  return {
    type: LOG_IN,
    user,
  };
}

export function logInError(error) {
  return {
    type: LOG_IN_ERROR,
    error,
  };
}

export function logIn(user) {
  return dispatch =>
    axios
      .post('/login', user)
      .then(res => {
        const { email, _id } = res.data.user;
        const loggedUser = { email, _id };
        dispatch(logInSuccess(loggedUser));
      })
      .catch(err => dispatch(logInError(err)));
}

export function logOutSuccess(user) {
  return {
    type: LOG_OUT,
    user,
  };
}

export function logOut() {
  return dispatch =>
    axios
      .get('/logout')
      .then(res => {
        dispatch(logOutSuccess(res));
      })
      .catch(err => console.log(err));
}

export function isLoggedInSuccess(user) {
  return {
    type: IS_LOGGED_IN,
    user,
  };
}

export function isLoggedIn() {
  return dispatch =>
    axios
      .get('/auth')
      .then(res => {
        dispatch(isLoggedInSuccess(res.data.user));
      })
      .catch(err => console.log(err));
}

export function signUpError(error) {
  return {
    type: SIGN_UP_ERROR,
    error,
  };
}

export function signUpSuccess(user) {
  return {
    type: SIGN_UP,
    user,
  };
}

export function signUp(user) {
  return dispatch =>
    axios
      .post('/signup', user)
      .then(res => {
        const { email, _id } = res.data.user;
        const loggedUser = { email, _id };
        dispatch(signUpSuccess(loggedUser));
      })
      .catch(err => dispatch(signUpError(err)));
}
