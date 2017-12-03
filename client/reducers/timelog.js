import { ADD_TIMELOG, GET_LOGS } from '../actions/actionTypes';

function timelog(state = {}, action) {
  switch (action.type) {
    case ADD_TIMELOG: {
      return state;
    }
    case GET_LOGS: {
      return action.response;
    }
    default:
      return state;
  }
}

export default timelog;
