import { GET_DASHBOARD_DATA } from '../actions/actionTypes';

function dashboard(state = [], action) {
  switch (action.type) {
    case GET_DASHBOARD_DATA:
      return action.response.data;
    default:
      return state;
  }
}

export default dashboard;
