import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import pageLoad from './pageLoad';
import otherSample from './otherSample';

const rootReducer = combineReducers({
  pageLoad,
  otherSample,
  routing: routerReducer,
});

export default rootReducer;
