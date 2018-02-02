import { REMOVE_MESSAGE, ADD_MESSAGE } from './actionTypes';

export function addMessage(message) {
  return {
    type: ADD_MESSAGE,
    message,
  };
}

export function removeMessage(name) {
  return {
    type: REMOVE_MESSAGE,
    name,
  };
}
