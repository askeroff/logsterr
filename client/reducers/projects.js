import { GET_PROJECTS } from '../actions/actionTypes';

function projects(state = [], action) {
  switch (action.type) {
    case GET_PROJECTS:
      console.log('get_projects reducer', action);
      return [{ name: 'project-name', id: 'sfsdfsds4234' }];
    default:
      return state;
  }
}

export default projects;
