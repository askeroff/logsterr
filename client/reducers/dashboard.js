import { GET_DASHBOARD_DATA } from '../actions/actionTypes';

function dashboard(state = {}, action) {
  switch (action.type) {
    case GET_DASHBOARD_DATA:
      console.log(action);
      return Object.assign({}, state, action.response);
    default:
      return state;
  }
}

export default dashboard;
