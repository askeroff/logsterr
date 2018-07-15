import {
  GET_PROJECTS,
  ADD_PROJECT,
  ADD_TIME_TO_PROJECT,
  RENAME_PROJECT,
  CLEAR_PROJECTS,
  DELETE_PROJECT,
  SUBTRACT_TASK_TIME
} from '../actions/actionTypes';

export function projects(state = [], action) {
  switch (action.type) {
    case ADD_PROJECT: {
      return [...state, action.project];
    }
    case ADD_TIME_TO_PROJECT: {
      const projectList = state.map(item => {
        const newItem = Object.assign({}, item);
        if (newItem._id === action.id) {
          newItem.timeSpent += action.time;
        }
        return newItem;
      });
      return projectList;
    }
    case SUBTRACT_TASK_TIME: {
      const projectsList = state.map(item => {
        if (item._id === action.id && action.deleteTime === true) {
          item.timeSpent -= action.timeSpent; // eslint-disable-line no-param-reassign
        }
        return item;
      });
      return projectsList;
    }
    case RENAME_PROJECT: {
      const projectsList = state.map(item => {
        if (item._id === action.project.id) {
          item.name = action.project.name; // eslint-disable-line no-param-reassign
          item.parent_Id = action.project.parentID; // eslint-disable-line no-param-reassign
        }
        return item;
      });
      return projectsList;
    }
    case GET_PROJECTS:
      return action.response.data.projectsList;
    case CLEAR_PROJECTS:
      return action.response;
    case DELETE_PROJECT: {
      const projectsList = state.filter(item => item._id !== action.id);
      return projectsList;
    }
    default:
      return state;
  }
}

export default projects;
