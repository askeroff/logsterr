import axios from 'axios';
import {
  GET_PROJECTS,
  ADD_PROJECT,
  RENAME_PROJECT,
  CLEAR_PROJECTS,
  DELETE_PROJECT,
  NEW_TASK,
  GET_TASKS,
  DELETE_TASK,
  RENAME_TASK,
  TOGGLE_DONE,
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

export function newTaskSuccess(task) {
  return {
    type: NEW_TASK,
    task,
  };
}

export function newTask(task) {
  const { name, project } = task;
  return dispatch =>
    axios
      .post(`/projects/${task.project}/add`, { name, project })
      .then(res => {
        dispatch(newTaskSuccess(res.data.task));
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

export function toggleDoneSuccess(id, done) {
  return {
    type: TOGGLE_DONE,
    id,
    done,
  };
}

export function toggleDone(id) {
  return dispatch =>
    axios
      .post(`/projects/tasks/${id}/done`, { id })
      .then(res => {
        dispatch(toggleDoneSuccess(id, res.data.done));
      })
      .catch(err => console.log(err));
}
