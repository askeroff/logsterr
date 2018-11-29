import deepClone from 'lodash.clonedeep';
import {
  GET_PROJECTS,
  ADD_PROJECT,
  RENAME_PROJECT,
  CLEAR_PROJECTS,
  DELETE_PROJECT,
  PROJECTS_DELETE_LOG,
  TOGGLE_PROJECT_DONE,
  FETCH_PROJECTS,
  ADD_TIME_TO_PROJECTS,
  SUBTRACT_PROJECT_TIME
} from '../actions/actionTypes';
import { findParents } from '../helpers';

export function projects(state = { list: [] }, action) {
  switch (action.type) {
    case FETCH_PROJECTS:
      return { ...state, isFetching: action.response };
    case ADD_PROJECT: {
      return { ...state, list: [...state.list, action.project] };
    }
    case SUBTRACT_PROJECT_TIME: {
      const currentParents = findParents(
        state.list,
        action.params.currentProject
      );
      const newParents = findParents(state.list, action.params.newProject);
      const list = state.list.map(item => {
        const newItem = deepClone(item);
        if (
          currentParents.includes(item._id) &&
          action.params.deleteTime === true
        ) {
          newItem.timeSpent -= action.params.timeSpent || 0;
        }
        if (newParents.includes(item._id) && action.params.moveTime === true) {
          newItem.timeSpent += action.params.timeSpent || 0;
        }
        return newItem;
      });
      return { ...state, list };
    }
    case RENAME_PROJECT: {
      const list = state.list.map(item => {
        const newItem = deepClone(item);
        if (item._id === action.project.id) {
          newItem.name = action.project.name;
          newItem.parent_id = action.project.parentID;
        }
        return newItem;
      });
      return { ...state, list };
    }
    case ADD_TIME_TO_PROJECTS: {
      const projectsList = action.data.projects.map(item => item.id);
      const list = state.list.map(item => {
        const newItem = deepClone(item);
        if (projectsList.includes(item._id)) {
          newItem.timeSpent += action.seconds;
        }
        return newItem;
      });
      return { ...state, list };
    }
    case TOGGLE_PROJECT_DONE: {
      const list = state.list.map(item => {
        const newItem = deepClone(item);
        if (item._id === action.id) {
          newItem.done = action.done;
        }
        return newItem;
      });
      return { ...state, list };
    }
    case GET_PROJECTS:
      return {
        ...state,
        list: action.response.data.projectsList,
        isFetching: false
      };
    case CLEAR_PROJECTS:
      return action.response;
    case DELETE_PROJECT: {
      const list = state.list.filter(item => item._id !== action.id);
      return { ...state, list };
    }
    case PROJECTS_DELETE_LOG: {
      const parents = findParents(state.list, action.data.project);
      const newList = state.list.map(item => {
        const newItem = deepClone(item);
        if (parents.includes(item._id)) {
          newItem.timeSpent -= action.data.timeSpent;
        }
        return newItem;
      });
      return { ...state, list: newList };
    }
    default:
      return state;
  }
}

export default projects;
