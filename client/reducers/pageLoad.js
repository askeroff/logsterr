import { PAGE_LOAD } from '../actions/actionTypes';

function userData(state = {}, action) {
  switch (action.type) {
    case PAGE_LOAD:
      return Object.assign({}, state, action.user);
    default:
      return state;
  }
}

export default userData;
