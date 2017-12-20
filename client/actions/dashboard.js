import axios from 'axios';
import { GET_DASHBOARD_DATA } from '../actions/actionTypes';

export function getMonthDataSuccess(response) {
  return {
    type: GET_DASHBOARD_DATA,
    response,
  };
}

export function getMonthData() {
  return dispatch =>
    axios
      .get('/dashboard/getdata/lastmonth')
      .then(res => {
        dispatch(getMonthDataSuccess(res.data));
      })
      .catch(err => console.log(err));
}
