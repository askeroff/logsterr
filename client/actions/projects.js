import axios from 'axios';
import {
  GET_PROJECTS,
  ADD_PROJECT,
  ADD_TIME_TO_PROJECT,
  RENAME_PROJECT,
  CLEAR_PROJECTS,
  DELETE_PROJECT,
  ADD_MESSAGE,
  TOGGLE_PROJECT_DONE,
  ADD_TIME_TO_TASK_PROJECT,
  FETCH_PROJECTS
} from '../actions/actionTypes';

export function addProjectSuccess(project) {
  return {
    type: ADD_PROJECT,
    project
  };
}

export function projectError(response) {
  return {
    type: ADD_MESSAGE,
    response
  };
}

export function addProject(name, id) {
  const error = {
    message: 'Something went wrong. Try adding the project later.',
    name: 'project-add-error',
    type: 'error'
  };
  return dispatch =>
    axios
      .post('/projects/add', { name, parent_id: id })
      .then(res => {
        if (res.data.project) {
          dispatch(addProjectSuccess(res.data.project));
        } else {
          error.message = res.data.error || error.message;
          dispatch(projectError(error));
        }
      })
      .catch(() => dispatch(projectError(error)));
}

export function renameProjectSuccess(project) {
  return {
    type: RENAME_PROJECT,
    project
  };
}

export function renameProject(id, name, parentID) {
  const error = {
    message: 'Something went wrong. Try renaming the project later.',
    name: 'project-rename-error',
    type: 'error'
  };
  return dispatch => {
    dispatch(renameProjectSuccess({ id, name, parentID }));
    return axios
      .post(`/projects/${id}/edit`, { name, parentID })
      .then(res => {
        if (res.data.error) {
          error.message = res.data.error;
          dispatch(projectError(error));
        }
      })
      .catch(() => dispatch(projectError(error)));
  };
}

export function addTimeToProjectSuccess(id, time) {
  return {
    type: ADD_TIME_TO_PROJECT,
    id,
    seconds: time
  };
}
export function addTimeToTaskProject(id, time) {
  return {
    type: ADD_TIME_TO_TASK_PROJECT,
    id,
    seconds: time
  };
}

export function addTimeToProject(id, time) {
  const error = {
    message: 'Something went wrong. Try adding time to this project later.',
    name: 'project-timeAdd-error',
    type: 'error'
  };
  return dispatch =>
    axios
      .post('/projects/addTime', { id, time })
      .then(res => {
        if (res.data.timeAdded) {
          dispatch(addTimeToProjectSuccess(id, time));
          dispatch(addTimeToTaskProject(id, time));
        } else {
          dispatch(projectError(error));
        }
      })
      .catch(() => dispatch(projectError(error)));
}

export function fetchProjects() {
  return {
    type: FETCH_PROJECTS,
    response: true
  };
}

export function getProjectsSuccess(response) {
  return {
    type: GET_PROJECTS,
    response
  };
}

export function getProjects() {
  const error = {
    message:
      'Something went wrong. Could not fetch the projects. Try reloading the page.',
    name: 'project-getList-error',
    type: 'error'
  };
  return dispatch =>
    axios
      .get('/projects/getProjects')
      .then(res => {
        if (res.data.projectsList) {
          dispatch(getProjectsSuccess(res));
        } else {
          dispatch(projectError(error));
        }
      })
      .catch(() => dispatch(projectError(error)));
}

export function clearProjects() {
  return {
    type: CLEAR_PROJECTS,
    response: []
  };
}

export function deleteProjectSuccess(id) {
  return {
    type: DELETE_PROJECT,
    id
  };
}

export function deleteProject(id) {
  const error = {
    message: 'Something went wrong. Could not delete the project. Try later',
    name: 'project-delete-error',
    type: 'error'
  };
  return dispatch =>
    axios
      .post('/projects/delete', { id })
      .then(res => {
        if (res.data.deleted) {
          dispatch(deleteProjectSuccess(id));
        } else {
          dispatch(projectError(error));
        }
      })
      .catch(() => dispatch(projectError(error)));
}

export function toggleDoneSuccess(id, done) {
  return {
    type: TOGGLE_PROJECT_DONE,
    id,
    done
  };
}

export function toggleDone(id) {
  const error = {
    message:
      'Something went wrong. Could not toggle the project. Try again or reload the page',
    name: 'projects-toggle-error',
    type: 'error'
  };
  return dispatch =>
    axios
      .post(`/projects/${id}/done`, { id })
      .then(res => {
        if (res.data.done !== undefined) {
          dispatch(toggleDoneSuccess(id, res.data.done));
        } else {
          error.message = res.data.error || error.message;
          dispatch(projectError(error));
        }
      })
      .catch(() => dispatch(projectError(error)));
}
