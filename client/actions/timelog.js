import axios from 'axios';
import { ADD_TIMELOG, GET_LOGS, CLEAR_LOGS, DELETE_LOG } from './actionTypes';

export function addTimelogSuccess(data, seconds) {
  return {
    type: ADD_TIMELOG,
    data,
    seconds,
  };
}

export function addTimelog(data, seconds) {
  return dispatch =>
    axios
      .post('/projects/timelog', data)
      .then(res => {
        dispatch(addTimelogSuccess(res.data, seconds));
      })
      .catch(err => console.log(err));
}

export function deleteLogSuccess(id) {
  return {
    type: DELETE_LOG,
    id,
  };
}

export function deleteLog(id) {
  return dispatch =>
    axios
      .post(`/timelogs/${id}/delete`, { id })
      .then(() => {
        dispatch(deleteLogSuccess(id));
      })
      .catch(err => console.log(err));
}

export function getLogsSuccess(response) {
  return {
    type: GET_LOGS,
    response,
  };
}

export function getLogs(page) {
  return dispatch =>
    axios
      .get(`/projects/getlogs/${page}`)
      .then(res => {
        dispatch(getLogsSuccess(res.data));
      })
      .catch(err => console.log(err));
}

export function clearLogs() {
  return {
    type: CLEAR_LOGS,
    response: {},
  };
}
