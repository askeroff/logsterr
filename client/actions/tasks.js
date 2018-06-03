// @flow
import axios from 'axios';
import {
  NEW_TASK,
  GET_TASKS,
  DELETE_TASK,
  CLEAR_TASKS,
  RENAME_TASK,
  TOGGLE_DONE,
  ADD_MESSAGE,
  SUBTRACT_TASK_TIME
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

export function getTasks(id: string) {
  const error = {
    message: 'Something went wrong. Could not load the tasks. Try reloading.',
    name: 'tasks-get-error',
    type: 'error'
  };
  return (dispatch: any) =>
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

export function deleteTaskSuccess(id: string) {
  return {
    type: DELETE_TASK,
    id
  };
}

export function deleteTask(id: string) {
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
          dispatch(deleteTaskSuccess(id));
        } else {
          dispatch(taskError(error));
        }
      })
      .catch(() => dispatch(taskError(error)));
}

export function renameTaskSuccess(params: IRenameTask) {
  return {
    type: RENAME_TASK,
    ...params
  };
}

export function subtractTaskTime(
  id: string,
  deleteTime: boolean,
  timeSpent: number
) {
  return {
    type: SUBTRACT_TASK_TIME,
    id,
    deleteTime,
    timeSpent
  };
}

export function renameTask(params: IRenameTask) {
  const error = {
    message:
      'Something went wrong. Could not rename the task. Try again or reload the page',
    name: 'tasks-rename-error',
    type: 'error'
  };
  return (dispatch: any) =>
    axios
      .post(`/projects/tasks/${params.id}/edit`, { ...params })
      .then(res => {
        if (res.data.renamed) {
          dispatch(renameTaskSuccess(params));
          dispatch(
            subtractTaskTime(
              params.currentProject || '',
              params.deleteTime || false,
              params.timeSpent || 0
            )
          );
        } else {
          dispatch(taskError(error));
        }
      })
      .catch(() => dispatch(taskError(error)));
}

export function clearTasks() {
  return {
    type: CLEAR_TASKS,
    response: []
  };
}

export function toggleDoneSuccess(id: string, done: boolean) {
  return {
    type: TOGGLE_DONE,
    id,
    done
  };
}

export function toggleDone(id: string) {
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
          dispatch(toggleDoneSuccess(id, res.data.done));
        } else {
          dispatch(taskError(error));
        }
      })
      .catch(() => dispatch(taskError(error)));
}
