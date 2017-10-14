import axios from 'axios';
import { LOG_OUT, LOG_IN, IS_LOGGED_IN } from './actionTypes';

export function logInSuccess(user) {
  return {
    type: LOG_IN,
    user,
  };
}

export function logIn(user) {
  return dispatch =>
    axios
      .post('/login', user)
      .then(res => {
        console.log('res from log in action', res);
        dispatch(logInSuccess(user));
      })
      .catch(err => console.log(err));
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
        console.log('res from log out action');
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
