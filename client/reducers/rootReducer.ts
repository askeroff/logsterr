import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import user from './user';
import projects from './projects';
import tasks from './tasks';
import timelog from './timelog';
import dashboard from './dashboard';
import messages from './messages';

const rootReducer = combineReducers({
  user,
  projects,
  tasks,
  timelog,
  dashboard,
  messages,
  router: routerReducer,
});

export default rootReducer;
