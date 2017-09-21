import axios from 'axios';

export function pageLoadSuccess(data) {
  return {
    type: 'PAGE_LOAD',
    data,
  };
}

export function pageLoad() {
  return dispatch => {
    return axios
      .get('/auth')
      .then(res => {
        dispatch(pageLoadSuccess(res));
      })
      .catch(err => console.log(err));
  };
}

export function othersample(index) {
  return {
    type: 'OTHER_SAMPLE_REDUCER',
    index,
  };
}
