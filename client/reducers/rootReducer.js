import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import user from './user';
import projects from './projects';

const rootReducer = combineReducers({
  user,
  projects,
  router: routerReducer,
});

export default rootReducer;
