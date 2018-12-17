import {
  ADD_TIMELOG,
  GET_LOGS,
  CLEAR_LOGS,
  DELETE_LOG,
} from '../actions/actionTypes';

function timelog(state = {}, action) {
  switch (action.type) {
    case ADD_TIMELOG:
      return { seconds: action.seconds };
    case GET_LOGS:
      return action.response;
    case DELETE_LOG: {
      const data = state.data.filter(item => item._id !== action.id);
      return Object.assign({}, state, { data });
    }
    case CLEAR_LOGS:
      return action.response;
    default:
      return state;
  }
}

export default timelog;
