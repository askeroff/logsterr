import { LOG_OUT } from '../actions/actionTypes';

function logOut(state = [], action) {
  switch (action.type) {
    case LOG_OUT:
      console.log(action, 'Log Out');
      return state;
    default:
      return state;
  }
}

export default logOut;
