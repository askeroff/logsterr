// @flow
import axios from 'axios';
import {
  NEW_TASK,
  GET_TASKS,
  DELETE_TASK,
  CLEAR_TASKS,
  EDIT_TASK,
  TOGGLE_DONE,
  ADD_MESSAGE,
  FETCH_TASKS,
  SUBTRACT_PROJECT_TIME
} from '../actions/actionTypes';
import { IRenameTask } from '../types';

export function getTasksSuccess(response: any) {
  return {
    type: GET_TASKS,
    response
  };
}

export function taskError(response: {
  message: string,
  name: string,
  type: string
}) {
  return {
    type: ADD_MESSAGE,
    response
  };
}

export function fetchTasks() {
  return {
    type: FETCH_TASKS,
    response: true
  };
}

export function getTasks(id: string, done: boolean) {
  const error = {
    message: 'Something went wrong. Could not load the tasks. Try reloading.',
    name: 'tasks-get-error',
    type: 'error'
  };
  return (dispatch: any) =>
    axios
      .get(`/projects/${id}/getTasks?done=${done.toString()}`)
      .then(res => {
        if (res.data.tasksList) {
          dispatch(
            getTasksSuccess({
              list: !done ? res.data.tasksList : undefined,
              doneList: done ? res.data.tasksList : undefined,
              project: res.data.project
            })
          );
        } else {
          dispatch(taskError(error));
        }
      })
      .catch(() => dispatch(taskError(error)));
}

export function newTaskSuccess(task: any) {
  return {
    type: NEW_TASK,
    task
  };
}

export function newTask(task: any) {
  const { name, project } = task;
  const error = {
    message:
      'Something went wrong. Could not create the task. Try again or reload the page',
    name: 'tasks-new-error',
    type: 'error'
  };
  return (dispatch: any) =>
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

export function deleteTaskSuccess(id: string, projectId: string) {
  return {
    type: DELETE_TASK,
    id,
    projectId
  };
}

export function deleteTask(id: string, projectId: string) {
  const error = {
    message:
      'Something went wrong. Could not delete the task. Try again or reload the page',
    name: 'tasks-delete-error',
    type: 'error'
  };
  return (dispatch: any) =>
    axios
      .post(`/projects/${id}/delete`, { id })
      .then(res => {
        if (res.data.deleted) {
          dispatch(deleteTaskSuccess(id, projectId));
        } else {
          dispatch(taskError(error));
        }
      })
      .catch(() => dispatch(taskError(error)));
}

export function renameTaskSuccess(params: IRenameTask) {
  return {
    type: EDIT_TASK,
    ...params
  };
}

export function subtractProjectTime(params: IRenameTask) {
  return {
    type: SUBTRACT_PROJECT_TIME,
    params
  };
}

export function renameTask(params: IRenameTask) {
  const error = {
    message:
      'Something went wrong. Could not rename the task. Try again or reload the page',
    name: 'tasks-rename-error',
    type: 'error'
  };
  return (dispatch: any) => {
    dispatch(renameTaskSuccess(params));
    dispatch(subtractProjectTime(params));
    return axios
      .post(`/projects/tasks/${params.id}/edit`, { ...params })
      .then(res => {
        if (!res.data.renamed) {
          dispatch(taskError(error));
        }
      })
      .catch(() => dispatch(taskError(error)));
  };
}

export function clearTasks() {
  return {
    type: CLEAR_TASKS,
    response: []
  };
}

export function toggleDoneSuccess(id: string, projectId: string, done: boolean) {
  return {
    type: TOGGLE_DONE,
    id,
    projectId,
    done
  };
}

export function toggleDone(id: string, projectId: string) {
  const error = {
    message:
      'Something went wrong. Could not toggle the task. Try again or reload the page',
    name: 'tasks-toggle-error',
    type: 'error'
  };
  return (dispatch: any) =>
    axios
      .post(`/projects/tasks/${id}/done`, { id })
      .then(res => {
        if (res.data.done !== undefined) {
          dispatch(toggleDoneSuccess(id, projectId, res.data.done));
        } else {
          dispatch(taskError(error));
        }
      })
      .catch(err => {
        console.log(err);
        dispatch(taskError(error));
      });
}
