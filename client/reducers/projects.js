import {
  GET_PROJECTS,
  ADD_PROJECT,
  RENAME_PROJECT,
  CLEAR_PROJECTS,
  DELETE_PROJECT,
} from '../actions/actionTypes';

function projects(state = [], action) {
  switch (action.type) {
    case ADD_PROJECT: {
      return [...state, action.project];
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
      return action.response.projectsList;
    case DELETE_PROJECT: {
      const projectsList = state.filter(item => item._id !== action.id);
      return projectsList;
    }
    default:
      return state;
  }
}

export default projects;
