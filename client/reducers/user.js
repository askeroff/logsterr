import { LOG_OUT, LOG_IN, IS_LOGGED_IN } from '../actions/actionTypes';

function handleUser(state = {}, action) {
  switch (action.type) {
    case LOG_OUT:
      console.log(action, 'Log Out');
      return state;
    case LOG_IN:
      console.log(action, 'Log In');
      return Object.assign({}, state, action.user);
    case IS_LOGGED_IN:
      console.log(action, 'Is logged in');
      return Object.assign({}, state, action.user);
    default:
      return state;
  }
}

export default handleUser;
