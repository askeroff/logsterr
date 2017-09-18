import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import sampleReducer from './sampleReducer';
import otherSample from './otherSample';

const rootReducer = combineReducers({
  sampleReducer,
  otherSample,
  routing: routerReducer,
});

export default rootReducer;
