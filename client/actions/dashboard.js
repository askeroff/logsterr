import axios from 'axios';
import { GET_DASHBOARD_DATA, ADD_MESSAGE } from '../actions/actionTypes';

export function getDashboardDataSuccess(response) {
  return {
    type: GET_DASHBOARD_DATA,
    response
  };
}

export function getDashboardDataError(response) {
  return {
    type: ADD_MESSAGE,
    response
  };
}

export function getDashboardData(start, end) {
  return dispatch =>
    axios
      .get(`/dashboard/getdata?start=${start}&end=${end}`)
      .then(res => {
        console.log(res.data);
        if (res.data.dataSent) {
          dispatch(getDashboardDataSuccess(res.data));
        } else {
          dispatch(
            getDashboardDataError({
              message:
                'Something went wrong fetching dashboard data. Reload the page and try again',
              name: 'dashboard-data-error',
              type: 'error'
            })
          );
        }
      })
      .catch(err => console.log(err));
}

// export function getDashboardData() {
//   return dispatch =>
//     axios
//       .get('/dashboard/getdata/all')
//       .then(res => {
//         if (res.data.dataSent) {
//           dispatch(getDashboardDataSuccess(res.data));
//         } else {
//           dispatch(
//             getDashboardDataError({
//               message:
//                 'Something went wrong fetching dashboard data. Reload the page and try again',
//               name: 'dashboard-data-error',
//               type: 'error',
//             })
//           );
//         }
//       })
//       .catch(err => console.log(err));
// }
