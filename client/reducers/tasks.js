import {
  GET_TASKS,
  CLEAR_TASKS,
  NEW_TASK,
  DELETE_TASK,
  EDIT_TASK,
  TOGGLE_DONE,
  FETCH_TASKS,
  ADD_TIMELOG
} from '../actions/actionTypes';

export function tasks(state = {}, action) {
  switch (action.type) {
    case FETCH_TASKS:
      return { ...state, isFetching: action.response };
    case GET_TASKS:
      return { ...state, list: action.response, isFetching: false };
    case CLEAR_TASKS:
      return { ...state, list: action.response };
    case NEW_TASK: {
      return { ...state, list: [...state.list, action.task] };
    }
    case DELETE_TASK: {
      return {
        ...state,
        list: state.list.filter(item => item._id !== action.id)
      };
    }
    case EDIT_TASK: {
      let sameProject = false;
      const tasksList = state.list.map(item => {
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
        return { ...state, list: tasksList };
      }
      return {
        ...state,
        list: tasksList.filter(item => item.project !== action.newProject)
      };
    }
    case TOGGLE_DONE: {
      const tasksList = state.list
        .map(item => {
          if (item._id === action.id) {
            return undefined;
          }
          return item;
        })
        .filter(item => item !== undefined);
      return { ...state, list: tasksList };
    }
    case ADD_TIMELOG: {
      const tasksList = state.list.map(item => {
        if (item._id === action.data.task._id) {
          item.timeSpent += action.seconds; // eslint-disable-line no-param-reassign
        }
        return item;
      });
      return { ...state, list: tasksList };
    }
    default:
      return state;
  }
}

export default tasks;
