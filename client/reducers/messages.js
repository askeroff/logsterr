import { ADD_MESSAGE, REMOVE_MESSAGE } from '../actions/actionTypes';

function messages(state = [], action) {
  switch (action.type) {
    case ADD_MESSAGE:
      return [...state, action.response];
    case REMOVE_MESSAGE: {
      const messagesList = state.filter(item => item.name !== action.name);
      return messagesList;
    }
    default:
      return state;
  }
}

export default messages;
