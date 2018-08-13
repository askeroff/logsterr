import axios from 'axios';
import {
  GET_DASHBOARD_DATA,
  ADD_MESSAGE,
  GET_MOTIVATION_DATA
} from '../actions/actionTypes';

export function getDashboardDataSuccess(response) {
  return {
    type: GET_DASHBOARD_DATA,
    response
  };
}

export function getDashboardDataError(response) {
  return {
    type: ADD_MESSAGE,
    response
  };
}

export function getDashboardData(start, end) {
  return dispatch =>
    axios
      .get(`/dashboard/getdata?start=${start}&end=${end}`)
      .then(res => {
        if (res.data.dataSent) {
          console.log(res.data.myData);
          dispatch(getDashboardDataSuccess(res.data));
        } else {
          dispatch(
            getDashboardDataError({
              message:
                'Something went wrong fetching dashboard data. Reload the page and try again',
              name: 'dashboard-data-error',
              type: 'error'
            })
          );
        }
      })
      .catch(err => console.log(err));
}

export function getMotivationSuccess(response) {
  return {
    type: GET_MOTIVATION_DATA,
    response
  };
}

export function getMotivationError(response) {
  return {
    type: ADD_MESSAGE,
    response
  };
}

export function getMotivationData() {
  return dispatch =>
    axios
      .get('/dashboard/getmotivation')
      .then(res => {
        if (res.data.dataSent) {
          dispatch(getMotivationSuccess(res.data));
        } else {
          dispatch(
            getDashboardDataError({
              message:
                'Something went wrong fetching dashboard data. Reload the page and try again',
              name: 'dashboard-data-error',
              type: 'error'
            })
          );
        }
      })
      .catch(err => console.log(err));
}
