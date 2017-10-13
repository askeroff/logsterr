import axios from 'axios';
import { PAGE_LOAD, SAMPLE_ACTION } from './actionTypes';

export function pageLoadSuccess(user) {
  return {
    type: PAGE_LOAD,
    user,
  };
}

export function pageLoad() {
  return dispatch =>
    axios
      .get('/auth')
      .then(res => {
        dispatch(pageLoadSuccess(res.data.user));
      })
      .catch(err => console.log(err));
}

export function othersample(index) {
  return {
    type: SAMPLE_ACTION,
    index,
  };
}
