import axios from 'axios';
import { ADD_TIMELOG } from './actionTypes';

export function addTimelogSuccess(data) {
  return {
    type: ADD_TIMELOG,
    data,
  };
}

export function addTimelog(data) {
  return dispatch =>
    axios
      .post('/projects/timelog', data)
      .then(res => {
        dispatch(addTimelogSuccess(res.data));
      })
      .catch(err => console.log(err));
}
