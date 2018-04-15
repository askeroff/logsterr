import axios from 'axios';
import {
  NEW_TASK,
  GET_TASKS,
  DELETE_TASK,
  CLEAR_TASKS,
  RENAME_TASK,
  TOGGLE_DONE,
  ADD_MESSAGE,
} from '../actions/actionTypes';

export function getTasksSuccess(response) {
  return {
    type: GET_TASKS,
    response,
  };
}

export function taskError(response) {
  return {
    type: ADD_MESSAGE,
    response,
  };
}

export function getTasks(id) {
  const error = {
    message: 'Something went wrong. Could not load the tasks. Try reloading.',
    name: 'tasks-get-error',
    type: 'error',
  };
  return dispatch =>
    axios
      .get(`/projects/${id}/getTasks`)
      .then(res => {
        if (res.data.tasksList) {
          dispatch(getTasksSuccess(res.data.tasksList));
        } else {
          dispatch(taskError(error));
        }
      })
      .catch(() => dispatch(taskError(error)));
}

export function newTaskSuccess(task) {
  return {
    type: NEW_TASK,
    task,
  };
}

export function newTask(task) {
  const { name, project } = task;
  const error = {
    message:
      'Something went wrong. Could not create the task. Try again or reload the page',
    name: 'tasks-new-error',
    type: 'error',
  };
  return dispatch =>
    axios
      .post(`/projects/${task.project}/add`, { name, project })
      .then(res => {
        if (res.data.task) {
          dispatch(newTaskSuccess(res.data.task));
        } else {
          dispatch(taskError(error));
        }
      })
      .catch(() => dispatch(taskError(error)));
}

export function deleteTaskSuccess(id) {
  return {
    type: DELETE_TASK,
    id,
  };
}

export function deleteTask(id) {
  const error = {
    message:
      'Something went wrong. Could not delete the task. Try again or reload the page',
    name: 'tasks-delete-error',
    type: 'error',
  };
  return dispatch =>
    axios
      .post(`/projects/${id}/delete`, { id })
      .then(res => {
        if (res.data.deleted) {
          dispatch(deleteTaskSuccess(id));
        } else {
          dispatch(taskError(error));
        }
      })
      .catch(() => dispatch(taskError(error)));
}

export function renameTaskSuccess(id, name, project) {
  return {
    type: RENAME_TASK,
    id,
    name,
    project
  };
}

export function renameTask(id, name, categoryID) {
  const error = {
    message:
      'Something went wrong. Could not rename the task. Try again or reload the page',
    name: 'tasks-rename-error',
    type: 'error',
  };
  return dispatch =>
    axios
      .post(`/projects/tasks/${id}/edit`, { id, name, project: categoryID })
      .then(res => {
        console.log(res.data);
        if (res.data.renamed) {
          dispatch(renameTaskSuccess(id, name, categoryID));
        } else {
          dispatch(taskError(error));
        }
      })
      .catch(() => dispatch(taskError(error)));
}

export function clearTasks() {
  return {
    type: CLEAR_TASKS,
    response: [],
  };
}

export function toggleDoneSuccess(id, done) {
  return {
    type: TOGGLE_DONE,
    id,
    done,
  };
}

export function toggleDone(id) {
  const error = {
    message:
      'Something went wrong. Could not toggle the task. Try again or reload the page',
    name: 'tasks-toggle-error',
    type: 'error',
  };
  return dispatch =>
    axios
      .post(`/projects/tasks/${id}/done`, { id })
      .then(res => {
        if (res.data.done !== undefined) {
          dispatch(toggleDoneSuccess(id, res.data.done));
        } else {
          dispatch(taskError(error));
        }
      })
      .catch(() => dispatch(taskError(error)));
}
