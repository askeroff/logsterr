import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import userData from './pageLoad';
import logOut from './logOut';

const rootReducer = combineReducers({
  userData,
  logOut,
  router: routerReducer,
});

export default rootReducer;
