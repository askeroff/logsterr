import {
  GET_PROJECTS,
  ADD_PROJECT,
  RENAME_PROJECT,
  CLEAR_PROJECTS,
  DELETE_PROJECT,
  TOGGLE_PROJECT_DONE,
  FETCH_PROJECTS,
  SUBTRACT_TASK_TIME
} from '../actions/actionTypes';

export function projects(state = { list: [] }, action) {
  switch (action.type) {
    case FETCH_PROJECTS:
      return { ...state, isFetching: action.response };
    case ADD_PROJECT: {
      return { ...state, list: [...state.list, action.project] };
    }
    case SUBTRACT_TASK_TIME: {
      const list = state.list.map(item => {
        if (item._id === action.id && action.deleteTime === true) {
          item.timeSpent -= action.timeSpent; // eslint-disable-line no-param-reassign
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
