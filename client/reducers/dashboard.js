import { GET_DASHBOARD_DATA } from '../actions/actionTypes';

export function dashboard(state = {}, action) {
  switch (action.type) {
    case GET_DASHBOARD_DATA:
      return Object.assign({}, state, action.response);
    default:
      return state;
  }
}

export default dashboard;
