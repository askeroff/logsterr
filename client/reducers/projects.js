import { GET_PROJECTS } from '../actions/actionTypes';

function projects(state = {}, action) {
  switch (action.type) {
    case GET_PROJECTS:
      return Object.assign({}, state, action.response.data);
    default:
      return state;
  }
}

export default projects;
