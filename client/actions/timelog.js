import axios from 'axios';
import { ADD_TIMELOG, GET_LOGS } from './actionTypes';

export function addTimelogSuccess(data) {
  return {
    type: ADD_TIMELOG,
    data,
  };
}

export function addTimelog(data) {
  return dispatch =>
    axios
      .post('/projects/timelog', data)
      .then(res => {
        dispatch(addTimelogSuccess(res.data));
      })
      .catch(err => console.log(err));
}

export function getLogsSuccess(response) {
  return {
    type: GET_LOGS,
    response,
  };
}

export function getLogs() {
  return dispatch =>
    axios
      .get('/projects/getlogs')
      .then(res => {
        dispatch(getLogsSuccess(res.data));
      })
      .catch(err => console.log(err));
}
