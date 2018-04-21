import {
  GET_PROJECTS,
  ADD_PROJECT,
  ADD_TIME_TO_PROJECT,
  RENAME_PROJECT,
  CLEAR_PROJECTS,
  DELETE_PROJECT,
  ADD_TIMELOG,
  SUBTRACT_TASK_TIME,
} from '../actions/actionTypes';

function projects(state = [], action) {
  switch (action.type) {
    case ADD_PROJECT: {
      return [...state, action.project];
    }
    case ADD_TIME_TO_PROJECT: {
      const projectsList = state.map(item => {
        if (item._id === action.id) {
          item.timeSpent += parseInt(action.time, 10); // eslint-disable-line no-param-reassign
        }
        return item;
      });
      return projectsList;
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
    case ADD_TIMELOG: {
      const projectList = state.map(item => {
        const newItem = item;
        if (newItem._id === action.data.project._id) {
          newItem.timeSpent += action.seconds;
        }
        return newItem;
      });
      return projectList;
    }
    default:
      return state;
  }
}

export default projects;
