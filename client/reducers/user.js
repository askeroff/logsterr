import {
  LOG_OUT,
  LOG_IN,
  IS_LOGGED_IN,
  SIGN_UP,
  LOG_IN_ERROR,
  SIGN_UP_ERROR,
  GET_RESET,
  POST_RESET,
  FORGOT
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
    case FORGOT:
      return Object.assign({}, state, { forgotResponse: action.response });
    case GET_RESET:
      return Object.assign({}, state, {
        getReset: action.data.getReset,
      });
    case POST_RESET:
      return Object.assign({}, state, {
        resetMessage: action.data.message,
        postReset: action.data.postReset,
      });
    default:
      return state;
  }
}

export default user;
