import {
  GET_TASKS,
  CLEAR_TASKS,
  NEW_TASK,
  DELETE_TASK,
  EDIT_TASK,
  TOGGLE_DONE,
  ADD_TIMELOG
} from '../actions/actionTypes';

export function tasks(state = [], action) {
  switch (action.type) {
    case GET_TASKS:
      return action.response;
    case CLEAR_TASKS:
      return action.response;
    case NEW_TASK: {
      return [...state, action.task];
    }
    case DELETE_TASK: {
      return state.filter(item => item._id !== action.id);
    }
    case EDIT_TASK: {
      let sameProject = false;
      const tasksList = state.map(item => {
        if (item._id === action.id) {
          item.name = action.name; // eslint-disable-line no-param-reassign
          if (item.project !== action.newProject) {
            item.project = action.newProject; // eslint-disable-line no-param-reassign
          } else {
            sameProject = true;
          }
        }
        return item;
      });
      if (sameProject) {
        return tasksList;
      }
      return tasksList.filter(item => item.project !== action.newProject);
    }
    case TOGGLE_DONE: {
      const tasksList = state.map(item => {
        if (item._id === action.id) {
          item.done = action.done; // eslint-disable-line no-param-reassign
        }
        return item;
      });
      return tasksList;
    }
    case ADD_TIMELOG: {
      const tasksList = state.map(item => {
        if (item._id === action.data.task._id) {
          item.timeSpent += action.seconds; // eslint-disable-line no-param-reassign
        }
        return item;
      });
      return tasksList;
    }
    default:
      return state;
  }
}

export default tasks;
