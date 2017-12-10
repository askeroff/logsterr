import axios from 'axios';
import {
  NEW_TASK,
  GET_TASKS,
  DELETE_TASK,
  RENAME_TASK,
  TOGGLE_DONE,
} from '../actions/actionTypes';

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
