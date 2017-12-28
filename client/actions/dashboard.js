import axios from 'axios';
import { GET_DASHBOARD_DATA } from '../actions/actionTypes';

export function getDashboardDataSuccess(response) {
  return {
    type: GET_DASHBOARD_DATA,
    response,
  };
}

export function getDashboardData() {
  return dispatch =>
    axios
      .get('/dashboard/getdata/lastmonth')
      .then(res => {
        dispatch(getDashboardDataSuccess(res.data));
      })
      .catch(err => console.log(err));
}
