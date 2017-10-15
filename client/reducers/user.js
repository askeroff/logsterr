import { LOG_OUT, LOG_IN, IS_LOGGED_IN, SIGN_UP } from '../actions/actionTypes';

function user(state = {}, action) {
  switch (action.type) {
    case LOG_OUT:
      return {};
    case LOG_IN:
      return Object.assign({}, state, action.user);
    case IS_LOGGED_IN:
      return Object.assign({}, state, action.user);
    case SIGN_UP:
      return Object.assign({}, state, action.user);
    default:
      return state;
  }
}

export default user;
