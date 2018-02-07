import axios from 'axios';
import {
  GET_PROJECTS,
  ADD_PROJECT,
  ADD_TIME_TO_PROJECT,
  RENAME_PROJECT,
  CLEAR_PROJECTS,
  DELETE_PROJECT,
  ADD_MESSAGE,
} from '../actions/actionTypes';

export function addProjectSuccess(project) {
  return {
    type: ADD_PROJECT,
    project,
  };
}

export function projectError(response) {
  return {
    type: ADD_MESSAGE,
    response,
  };
}

export function addProject(name) {
  const error = {
    message: 'Something went wrong. Try adding the project later.',
    name: 'project-add-error',
    type: 'error',
  };
  return dispatch =>
    axios
      .post('/projects/add', { name })
      .then(res => {
        if (res.data.project) {
          dispatch(addProjectSuccess(res.data.project));
        } else {
          dispatch(projectError(error));
        }
      })
      .catch(() => dispatch(projectError(error)));
}

export function renameProjectSuccess(project) {
  return {
    type: RENAME_PROJECT,
    project,
  };
}

export function renameProject(id, name) {
  const error = {
    message: 'Something went wrong. Try renaming the project later.',
    name: 'project-rename-error',
    type: 'error',
  };
  return dispatch =>
    axios
      .post(`/projects/${id}/edit`, { name })
      .then(res => {
        if (res.data.project) {
          dispatch(renameProjectSuccess({ id, name }));
        } else {
          dispatch(projectError(error));
        }
      })
      .catch(() => dispatch(projectError(error)));
}

export function addTimeToProjectSuccess(id, time) {
  return {
    type: ADD_TIME_TO_PROJECT,
    id,
    time,
  };
}

export function addTimeToProject(id, time) {
  const error = {
    message: 'Something went wrong. Try adding time to this project later.',
    name: 'project-timeAdd-error',
    type: 'error',
  };
  return dispatch =>
    axios
      .post('/projects/addTime', { id, time })
      .then(res => {
        if (res.data.timeAdded) {
          dispatch(addTimeToProjectSuccess(id, time));
        } else {
          dispatch(projectError(error));
        }
      })
      .catch(() => dispatch(projectError(error)));
}

export function getProjectsSuccess(response) {
  return {
    type: GET_PROJECTS,
    response,
  };
}

export function getProjects(authorID) {
  const error = {
    message:
      'Something went wrong. Could not fetch the projects. Try reloading the page.',
    name: 'project-getList-error',
    type: 'error',
  };
  return dispatch =>
    axios
      .get('/projects/getProjects', authorID)
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
    response: [],
  };
}

export function deleteProjectSuccess(id) {
  return {
    type: DELETE_PROJECT,
    id,
  };
}

export function deleteProject(id) {
  const error = {
    message: 'Something went wrong. Could not delete the project. Try later',
    name: 'project-delete-error',
    type: 'error',
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
