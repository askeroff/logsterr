import {
  GET_PROJECTS,
  CLEAR_PROJECTS,
  DELETE_PROJECT,
  GET_TASKS,
  DELETE_TASK,
  RENAME_TASK,
  TOGGLE_DONE,
} from '../actions/actionTypes';

function projects(state = {}, action) {
  switch (action.type) {
    case GET_PROJECTS:
      return Object.assign({}, state, action.response.data);
    case CLEAR_PROJECTS:
      return action.response.projectsList;
    case DELETE_PROJECT: {
      const projectsList = state.projectsList.filter(
        item => item._id !== action.id
      );
      return Object.assign({}, state, { projectsList });
    }
    case GET_TASKS:
      return Object.assign({}, state, { tasksList: action.response });
    case DELETE_TASK: {
      const tasksList = state.tasksList.filter(item => item._id !== action.id);
      return Object.assign({}, state, { tasksList });
    }
    case RENAME_TASK: {
      const tasksList = state.tasksList.map(item => {
        if (item._id === action.id) {
          item.name = action.name; // eslint-disable-line no-param-reassign
        }
        return item;
      });
      return Object.assign({}, state, { tasksList });
    }
    case TOGGLE_DONE: {
      const tasksList = state.tasksList.map(item => {
        if (item._id === action.id) {
          item.done = action.done; // eslint-disable-line no-param-reassign
        }
        return item;
      });
      return Object.assign({}, state, { tasksList });
    }
    default:
      return state;
  }
}

export default projects;
