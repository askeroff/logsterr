import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import userData from './pageLoad';
import otherSample from './otherSample';

const rootReducer = combineReducers({
  userData,
  otherSample,
  router: routerReducer,
});

export default rootReducer;
