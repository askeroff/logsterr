import axios from 'axios';
import { toast } from 'react-toastify';

import {
  LOG_OUT,
  LOG_IN,
  IS_LOGGED_IN,
  SIGN_UP,
  FORGOT,
  GET_RESET,
  POST_RESET,
  LOG_IN_ERROR,
  SIGN_UP_ERROR,
  SAVE_SETTINGS,
  ADD_MESSAGE
} from './actionTypes';

export function userMessage(response) {
  return {
    type: ADD_MESSAGE,
    response
  };
}

export function logInSuccess(user) {
  return {
    type: LOG_IN,
    user
  };
}

export function logInError(error) {
  return {
    type: LOG_IN_ERROR,
    error
  };
}

export function logIn(user) {
  return dispatch =>
    axios
      .post('/login', user)
      .then(res => {
        const { email, _id } = res.data.user;
        const loggedUser = { email, _id, loggedIn: true };
        dispatch(logInSuccess(loggedUser));
      })
      .catch(err => dispatch(logInError(err)));
}

export function logOutSuccess(user) {
  return {
    type: LOG_OUT,
    user
  };
}

export function logOut() {
  return dispatch =>
    axios
      .get('/logout')
      .then(res => {
        dispatch(logOutSuccess(res.data));
      })
      .catch(err => console.log(err));
}

export function isLoggedInSuccess(user) {
  return {
    type: IS_LOGGED_IN,
    user
  };
}

export function isLoggedIn() {
  return dispatch =>
    axios
      .get('/auth')
      .then(res => {
        dispatch(isLoggedInSuccess(res.data.user));
      })
      .catch(err => console.log(err, 'action error'));
}

export function signUpError(error) {
  return {
    type: SIGN_UP_ERROR,
    error
  };
}

export function signUpSuccess(user) {
  return {
    type: SIGN_UP,
    user
  };
}

export function signUp(user) {
  return dispatch =>
    axios
      .post('/signup', user)
      .then(res => {
        const { email, _id } = res.data.user;
        const loggedUser = { email, _id, loggedIn: true };
        dispatch(signUpSuccess(loggedUser));
      })
      .catch(err => {
        dispatch(signUpError(err));
      });
}

export function saveSettingsSuccess(user) {
  return {
    type: SAVE_SETTINGS,
    user
  };
}

export function saveSettings(settings) {
  return dispatch =>
    axios
      .post('/settings', { settings })
      .then(res => {
        if (res.data.error) {
          toast.error(res.data.error);
        } else {
          dispatch(saveSettingsSuccess(res.data.user));
          toast.success('Settings Saved');
        }
      })
      .catch(() => {
        toast.error('Something went wrong!');
      });
}

export function forgotSuccess(response) {
  return {
    type: FORGOT,
    response
  };
}

export function forgot(email) {
  return dispatch =>
    axios
      .post('/forgot', { email })
      .then(res => {
        if (res.data.success === false) {
          dispatch(
            userMessage({
              message: res.data.message,
              name: `user-forgot-message-${Date.now()}`,
              type: 'error'
            })
          );
        } else {
          dispatch(
            userMessage({
              message: res.data.message,
              name: `user-forgot-message-${Date.now()}`,
              type: 'info'
            })
          );
        }
        dispatch(forgotSuccess(true));
      })
      .catch(err => {
        dispatch(
          userMessage({
            message:
              'Sorry, something went wrong on our side. Try later or contact support.',
            name: `user-forgot-message-${Date.now()}`,
            type: 'error'
          })
        );
        dispatch(forgotSuccess(true));
        console.log(err);
      });
}

export function getResetSuccess(data) {
  return {
    type: GET_RESET,
    data
  };
}

export function getReset(token) {
  return dispatch =>
    axios
      .get(`/account/reset/${token}`)
      .then(res => {
        dispatch(getResetSuccess(res.data));
      })
      .catch(err => {
        console.log(err);
      });
}

export function postResetSuccess(data) {
  return {
    type: POST_RESET,
    data
  };
}

export function postReset(token, password) {
  return dispatch =>
    axios
      .post(`/account/reset/${token}`, { password })
      .then(res => {
        dispatch(postResetSuccess(res.data));
      })
      .catch(err => {
        console.log(err);
      });
}
