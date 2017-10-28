import { GET_PROJECTS } from '../actions/actionTypes';

function projects(state = [], action) {
  switch (action.type) {
    case GET_PROJECTS:
      console.log('get_projects reducer', action.response.data.projects);
      return Object.assign({}, state, action.response.data.projects);
    default:
      return state;
  }
}

export default projects;
