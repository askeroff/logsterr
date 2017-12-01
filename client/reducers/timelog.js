import { ADD_TIMELOG } from '../actions/actionTypes';

function timelog(state = {}, action) {
  switch (action.type) {
    case ADD_TIMELOG: {
      console.log(action);
      return state;
    }
    default:
      return state;
  }
}

export default timelog;
