import {
  LOG_OUT,
  LOG_IN,
  IS_LOGGED_IN,
  SIGN_UP,
  LOG_IN_ERROR,
  SIGN_UP_ERROR,
} from '../actions/actionTypes';

function user(state = {}, action) {
  switch (action.type) {
    case LOG_OUT:
      return action.user;
    case LOG_IN:
      return Object.assign({ loggedIn: true }, state, action.user);
    case LOG_IN_ERROR:
      return Object.assign({}, state, { error: 'Wrong email/password' });
    case IS_LOGGED_IN:
      return Object.assign({}, state, action.user);
    case SIGN_UP:
      return Object.assign({}, state, action.user);
    case SIGN_UP_ERROR:
      return Object.assign({}, state, {
        errors: action.error.response.data.errors,
      });
    default:
      return state;
  }
}

export default user;
