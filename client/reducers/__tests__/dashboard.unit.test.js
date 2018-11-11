import { dashboard } from '../dashboard';
import { GET_DASHBOARD_DATA } from '../../actions/actionTypes';

const response = {
  dataSent: true,
  isFetching: false,
  lastWeek: [
    {
      '5a2a1b97a2efd310b822559d': {
        id: '5a2a1b97a2efd310b822559d',
        taskName: 'Practicing songs',
        time: 13243
      },
      id: '5ad79de1e1d0a410c4f2834e',
      time: 19012
    }
  ],
  month: [
    {
      '5ab221c986b56615e0c5ba59': {
        id: '5ab221c986b56615e0c5ba59',
        taskName: 'Reading: Working Effectively With Legacy Code',
        time: 4174
      },
      id: '5ad3b1be1c06a61a302fe853',
      time: 4174
    }
  ],
  thisWeek: [
    {
      '5a394bd1cec11c01124d8783': {
        id: '5a394bd1cec11c01124d8783',
        taskName: 'Coding timetracker',
        time: 1200
      },
      id: '5a281df108567500ade59253',
      time: 1200
    }
  ],
  today: [
    {
      '5a50b29f2df2b024982b0548': {
        id: '5a50b29f2df2b024982b0548',
        taskName: 'Duolingo',
        time: 369
      },
      id: '5a2694c6ee7544097c707d1c',
      time: 369
    }
  ]
};

describe('Dashboard Reducer', () => {
  test('Get dashboard data', () => {
    const result = dashboard({}, { type: GET_DASHBOARD_DATA, response });
    expect(result).toEqual(response);
  });
});
