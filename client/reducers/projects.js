import {
  GET_PROJECTS,
  CLEAR_PROJECTS,
  DELETE_PROJECT,
  GET_TASKS,
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
    default:
      return state;
  }
}

export default projects;
