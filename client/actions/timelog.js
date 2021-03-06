import axios from 'axios';
import {
  ADD_TIMELOG,
  GET_LOGS,
  CLEAR_LOGS,
  DELETE_LOG,
  PROJECTS_DELETE_LOG,
  TASKS_DELETE_LOG,
  ADD_MESSAGE,
  MOTIVATION_ADD_TIMELOG,
  ADD_TIME_TO_PROJECTS,
  ADD_TIME_TO_PROJECT
} from './actionTypes';

export function timelogError(response) {
  return {
    type: ADD_MESSAGE,
    response
  };
}

export function addTimelogSuccess(data, seconds) {
  return {
    type: ADD_TIMELOG,
    data,
    seconds
  };
}

export function addTimeToProjects(data, seconds) {
  return {
    type: ADD_TIME_TO_PROJECTS,
    data,
    seconds
  };
}

export function addTimeProjectSuccess(data, seconds) {
  return {
    type: ADD_TIME_TO_PROJECT,
    id: data.project._id,
    time: seconds
  };
}
export function addTimeMotivation(data, seconds) {
  return {
    type: MOTIVATION_ADD_TIMELOG,
    id: data.project._id,
    time: seconds
  };
}

export function addTimelog(data, seconds) {
  const error = {
    message:
      'Something went wrong. Could not add this timelog. Try adding this time manually',
    name: 'timelog-add-error',
    type: 'error'
  };
  return dispatch =>
    axios
      .post('/projects/timelog', data)
      .then(res => {
        console.log(res, 'RESPONSE ADD TIMELOG');
        if (res.data.success === true) {
          dispatch(addTimelogSuccess(res.data, seconds));
          dispatch(addTimeToProjects(res.data, seconds));
          dispatch(addTimeMotivation(res.data, seconds));
        } else {
          dispatch(timelogError(error));
        }
      })
      .catch(() => dispatch(timelogError(error)));
}

export function deleteLogSuccess(id) {
  return {
    type: DELETE_LOG,
    id
  };
}

function projectsLogDeleted(data) {
  return {
    type: PROJECTS_DELETE_LOG,
    data
  };
}

function tasksLogDeleted(data) {
  return {
    type: TASKS_DELETE_LOG,
    data
  };
}

export function deleteLog(id) {
  const error = {
    message:
      'Something went wrong. Could not delete this timelog. Try reloading',
    name: 'timelog-delete-error',
    type: 'error'
  };
  return dispatch =>
    axios
      .post(`/timelogs/${id}/delete`, { id })
      .then(res => {
        if (res.data.deleted === true) {
          dispatch(projectsLogDeleted(res.data));
          dispatch(tasksLogDeleted(res.data));
          dispatch(deleteLogSuccess(id));
        } else {
          dispatch(timelogError(error));
        }
      })
      .catch(() => dispatch(timelogError(error)));
}

export function getLogsSuccess(response) {
  return {
    type: GET_LOGS,
    response
  };
}

export function getLogs(page) {
  const error = {
    message: 'Something went wrong. Could not fetch the data. Try reloading',
    name: 'timelog-getlogs-error',
    type: 'error'
  };
  return dispatch =>
    axios
      .get(`/projects/getlogs/${page}`)
      .then(res => {
        if (res.data.sent) {
          dispatch(getLogsSuccess(res.data));
        } else {
          dispatch(timelogError(error));
        }
      })
      .catch(() => dispatch(timelogError(error)));
}

export function clearLogs() {
  return {
    type: CLEAR_LOGS,
    response: {}
  };
}
