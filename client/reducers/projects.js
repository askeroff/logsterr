import { GET_PROJECTS, CLEAR_PROJECTS } from '../actions/actionTypes';

function projects(state = {}, action) {
  switch (action.type) {
    case GET_PROJECTS:
      return Object.assign({}, state, action.response.data);
    case CLEAR_PROJECTS:
      return action.response.projectsList;
    default:
      return state;
  }
}

export default projects;
