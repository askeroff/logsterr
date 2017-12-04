import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import user from './user';
import projects from './projects';
import tasks from './tasks';
import timelog from './timelog';

const rootReducer = combineReducers({
  user,
  projects,
  tasks,
  timelog,
  router: routerReducer,
});

export default rootReducer;
