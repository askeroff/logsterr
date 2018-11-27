import deepClone from 'lodash.clonedeep';
import {
  GET_PROJECTS,
  ADD_PROJECT,
  RENAME_PROJECT,
  CLEAR_PROJECTS,
  DELETE_PROJECT,
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
        if (
          currentParents.includes(item._id) &&
          action.params.deleteTime === true
        ) {
          item.timeSpent -= action.params.timeSpent || 0; // eslint-disable-line no-param-reassign
        }
        if (newParents.includes(item._id) && action.params.moveTime === true) {
          item.timeSpent += action.params.timeSpent || 0; // eslint-disable-line no-param-reassign
        }
        return item;
      });
      return { ...state, list };
    }
    case RENAME_PROJECT: {
      const list = state.list.map(item => {
        if (item._id === action.project.id) {
          item.name = action.project.name; // eslint-disable-line no-param-reassign
          item.parent_id = action.project.parentID; // eslint-disable-line no-param-reassign
        }
        return item;
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
        if (item._id === action.id) {
          item.done = action.done; // eslint-disable-line no-param-reassign
        }
        return item;
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
    default:
      return state;
  }
}

export default projects;
