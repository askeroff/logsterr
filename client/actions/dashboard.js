import axios from 'axios';
import moment from 'moment-timezone';
import {
  GET_DASHBOARD_DATA,
  ADD_MESSAGE,
  FETCH_DASHBOARD,
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

export function fetchPosts() {
  return {
    type: FETCH_DASHBOARD,
    response: true
  };
}

export function getDashboardData(start, end) {
  return dispatch =>
    axios
      .get(`/dashboard/getdata?start=${start}&end=${end}`)
      .then(res => {
        if (res.data.dataSent) {
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

export function getMotivationData(id) {
  const lastSunday = moment()
    .isoWeekday(0)
    .endOf('day')
    .valueOf();
  const lastMonday = moment()
    .isoWeekday(-6)
    .startOf('day')
    .valueOf();
  const thisMonday = moment()
    .isoWeekday(1)
    .startOf('day')
    .valueOf();
  const thisSunday = moment()
    .isoWeekday(7)
    .endOf('day')
    .valueOf();
  const dateString = `lastSunday=${lastSunday}&lastMonday=${lastMonday}&thisMonday=${thisMonday}&thisSunday=${thisSunday}`;
  return dispatch =>
    axios
      .get(`/dashboard/getmotivation?project=${id}&${dateString}`)
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
