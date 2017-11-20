import axios from 'axios';
import {
  GET_PROJECTS,
  CLEAR_PROJECTS,
  DELETE_PROJECT,
  GET_TASKS,
  DELETE_TASK,
  RENAME_TASK,
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

export function getTasksSuccess(response) {
  return {
    type: GET_TASKS,
    response,
  };
}

export function getTasks(id) {
  return dispatch =>
    axios
      .get(`/projects/${id}/getTasks`)
      .then(res => {
        dispatch(getTasksSuccess(res.data));
      })
      .catch(err => console.log(err));
}

export function deleteTaskSuccess(id) {
  return {
    type: DELETE_TASK,
    id,
  };
}

export function deleteTask(id) {
  return dispatch =>
    axios
      .post(`/projects/${id}/delete`, { id })
      .then(() => {
        dispatch(deleteTaskSuccess(id));
      })
      .catch(err => console.log(err));
}

export function renameTaskSuccess(id, name) {
  return {
    type: RENAME_TASK,
    id,
    name,
  };
}

export function renameTask(id, name) {
  return dispatch =>
    axios
      .post(`/projects/tasks/${id}/edit`, { id, name })
      .then(() => {
        dispatch(renameTaskSuccess(id, name));
      })
      .catch(err => console.log(err));
}
