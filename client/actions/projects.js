import axios from 'axios';
import {
  GET_PROJECTS,
  ADD_PROJECT,
  RENAME_PROJECT,
  CLEAR_PROJECTS,
  DELETE_PROJECT,
} from '../actions/actionTypes';

export function addProjectSuccess(project) {
  return {
    type: ADD_PROJECT,
    project,
  };
}

export function addProject(name) {
  return dispatch =>
    axios
      .post('/projects/add', { name })
      .then(res => {
        dispatch(addProjectSuccess(res.data.project));
      })
      .catch(err => console.log(err));
}

export function renameProjectSuccess(project) {
  return {
    type: RENAME_PROJECT,
    project,
  };
}

export function renameProject(id, name) {
  return dispatch =>
    axios
      .post(`/projects/${id}/edit`, { name })
      .then(() => {
        dispatch(renameProjectSuccess({ id, name }));
      })
      .catch(err => console.log(err));
}

export function getProjectsSuccess(response) {
  return {
    type: GET_PROJECTS,
    response,
  };
}

export function getProjects(authorID) {
  return dispatch =>
    axios
      .get('/projects/getProjects', authorID)
      .then(res => {
        dispatch(getProjectsSuccess(res));
      })
      .catch(err => console.log(err));
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
  return dispatch =>
    axios
      .post('/projects/delete', { id })
      .then(() => {
        dispatch(deleteProjectSuccess(id));
      })
      .catch(err => console.log(err));
}
