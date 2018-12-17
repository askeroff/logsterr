import deepClone from 'lodash.clonedeep';
import {
  GET_DASHBOARD_DATA,
  GET_MOTIVATION_DATA,
  MOTIVATION_ADD_TIMELOG,
  FETCH_DASHBOARD
} from '../actions/actionTypes';

export function dashboard(state = {}, action) {
  switch (action.type) {
    case FETCH_DASHBOARD:
      return { ...state, isFetching: action.response };
    case GET_DASHBOARD_DATA:
      return { ...state, ...action.response, isFetching: false };
    case GET_MOTIVATION_DATA:
      return { ...state, ...action.response, isFetching: false };
    case MOTIVATION_ADD_TIMELOG: {
      const thisWeek = deepClone(state.thisWeek);
      thisWeek.seconds += action.time;
      return { ...state, thisWeek };
    }
    default:
      return state;
  }
}

export default dashboard;
