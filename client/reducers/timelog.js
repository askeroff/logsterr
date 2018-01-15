import {
  ADD_TIMELOG,
  GET_LOGS,
  CLEAR_LOGS,
  DELETE_LOG,
} from '../actions/actionTypes';

function timelog(state = {}, action) {
  switch (action.type) {
    case ADD_TIMELOG:
      /*
     I return this weird object because I don't really use state after this action,
     and the only place I need it is in Project component and only seconds added
     to remove them real-time in MotivationBlock component
    */
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
