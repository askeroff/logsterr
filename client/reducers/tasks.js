import deepClone from 'lodash.clonedeep';
import { findParents } from '../helpers';
import {
  GET_TASKS,
  NEW_TASK,
  DELETE_TASK,
  EDIT_TASK,
  TASKS_DELETE_LOG,
  ADD_TIME_TO_TASK_PROJECT,
  TOGGLE_DONE,
  FETCH_TASKS,
  ADD_TIMELOG
} from '../actions/actionTypes';

function editTask(state, action) {
  let editedTask;
  let addList;
  const toBeMoved = action.currentProject !== action.newProject;
  const projects = state.list.map(item => ({ ...deepClone(item.project) }));
  const currentParents = findParents(projects, action.currentProject);
  const newParents = findParents(projects, action.newProject);
  const newList = state.list.map(item => {
    if (currentParents.includes(item.project._id)) {
      const newItem = deepClone(item);
      newItem.list = newItem.list
        .map(task => {
          const newTask = { ...task };
          if (task._id === action.id) {
            newTask.name = action.name;
            editedTask = newTask;
            if (toBeMoved) {
              return undefined;
            }
          }
          return newTask;
        })
        .filter(edited => edited !== undefined);
      newItem.project.timeSpent = action.deleteTime
        ? newItem.project.timeSpent - action.timeSpent
        : newItem.project.timeSpent;
      return newItem;
    }
    return item;
  });
  if (toBeMoved) {
    addList = newList.map(myItem => {
      const newItem = deepClone(myItem);
      if (newParents.includes(myItem.project._id)) {
        newItem.project.timeSpent = action.moveTime
          ? newItem.project.timeSpent + action.timeSpent
          : newItem.project.timeSpent;
      }
      if (myItem.project._id === action.newProject) {
        newItem.list.push(editedTask);
      }
      return newItem;
    });
  }
  return { ...state, list: addList || newList };
}

export function tasks(state = { list: [] }, action) {
  switch (action.type) {
    case FETCH_TASKS:
      return { ...state, isFetching: action.response };
    case GET_TASKS: {
      let newProject = true;
      let newState = state.list.map(item => {
        const newItem = deepClone(item);
        if (item.project._id === action.response.project._id) {
          newProject = false;
          newItem.list = action.response.list || newItem.list;
          newItem.doneList = action.response.doneList || newItem.doneList;
          newItem.project = {
            ...action.response.project,
            initialTime: action.response.project.timeSpent
          };
        }
        return newItem;
      });
      if (newProject) {
        newState = [
          ...state.list,
          {
            list: action.response.list,
            doneList: action.response.doneList,
            project: {
              ...action.response.project,
              initialTime: action.response.project.timeSpent
            }
          }
        ];
      }
      return { list: newState, isFetching: false };
    }
    case NEW_TASK: {
      const newList = state.list.map(item => {
        if (item.project._id === action.task.project) {
          const newItem = deepClone(item);
          newItem.list.push(action.task);
          return newItem;
        }
        return item;
      });
      return { ...state, list: newList };
    }
    case DELETE_TASK: {
      const newList = state.list.map(item => {
        if (item.project._id === action.projectId) {
          const newItem = deepClone(item);
          newItem.list = newItem.list.filter(task => task._id !== action.id);
          return newItem;
        }
        return item;
      });
      return { ...state, list: newList };
    }
    case EDIT_TASK: {
      return editTask(state, action);
    }
    case TOGGLE_DONE: {
      let newList = state.list;
      let taskBuffer;
      newList = state.list.map(item => {
        const newItem = deepClone(item);
        if (item.project._id === action.projectId) {
          if (action.done) {
            newItem.list = newItem.list.filter(task => {
              if (task._id === action.id) {
                taskBuffer = task;
                taskBuffer.done = true;
              }
              return task._id !== action.id;
            });
            if (newItem.doneList) {
              newItem.doneList = [...newItem.doneList, taskBuffer];
            }
          } else if (action.done === false) {
            newItem.doneList = newItem.doneList.filter(task => {
              if (task._id === action.id) {
                taskBuffer = task;
                taskBuffer.done = false;
              }
              return task._id !== action.id;
            });
            if (newItem.list) {
              newItem.list = [...newItem.list, taskBuffer];
            }
          }
          return newItem;
        }
        return newItem;
      });

      return { ...state, list: newList };
    }
    case ADD_TIME_TO_TASK_PROJECT: {
      const newList = state.list.map(item => {
        const newItem = deepClone(item);
        if (newItem.project._id === action.id) {
          newItem.project.timeSpent += action.seconds;
        }
        return newItem;
      });
      return { ...state, list: newList };
    }
    case ADD_TIMELOG: {
      const projects = action.data.projects.map(item => item.id);
      const newList = state.list.map(item => {
        const newItem = deepClone(item);
        if (projects.includes(item.project._id)) {
          newItem.project.timeSpent += action.seconds;
        }
        if (item.project._id === action.data.project._id) {
          newItem.list = newItem.list.map(task => {
            const newTask = deepClone(task);
            if (task._id === action.data.task._id) {
              newTask.timeSpent += action.seconds;
            }
            return newTask;
          });
          return newItem;
        }
        return newItem;
      });
      return { ...state, list: newList };
    }
    case TASKS_DELETE_LOG: {
      const projects = state.list.map(item => ({ ...deepClone(item.project) }));
      const parents = findParents(projects, action.data.project);
      const newList = state.list.map(item => {
        const newItem = deepClone(item);
        if (parents.includes(newItem.project._id)) {
          newItem.project.timeSpent -= action.data.timeSpent;
        }
        if (newItem.project._id === action.data.project) {
          newItem.list = newItem.list.map(task => {
            const newTask = deepClone(task);
            if (task._id === action.data.task) {
              newTask.timeSpent -= action.data.timeSpent;
            }
            return newTask;
          });
        }
        return newItem;
      });

      return { ...state, list: newList };
    }
    default:
      return state;
  }
}

export default tasks;
