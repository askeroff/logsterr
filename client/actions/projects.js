import axios from 'axios';
import {
  GET_PROJECTS,
  CLEAR_PROJECTS,
  DELETE_PROJECT,
} from '../actions/actionTypes';

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

export function clearProjects(response) {
  return {
    type: CLEAR_PROJECTS,
    response,
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
