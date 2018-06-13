import { dashboard } from '../dashboard';
import { GET_DASHBOARD_DATA } from '../../actions/actionTypes';

const response = {
  lastWeek: [
    {
      time: 19012,
      id: '5ad79de1e1d0a410c4f2834e',
      '5a2a1b97a2efd310b822559d': {
        taskName: 'Practicing songs',
        time: 13243,
        id: '5a2a1b97a2efd310b822559d'
      }
    }
  ],
  thisWeek: [
    {
      time: 1200,
      id: '5a281df108567500ade59253',
      '5a394bd1cec11c01124d8783': {
        taskName: 'Coding timetracker',
        time: 1200,
        id: '5a394bd1cec11c01124d8783'
      }
    }
  ],
  today: [
    {
      time: 369,
      id: '5a2694c6ee7544097c707d1c',
      '5a50b29f2df2b024982b0548': {
        taskName: 'Duolingo',
        time: 369,
        id: '5a50b29f2df2b024982b0548'
      }
    }
  ],
  month: [
    {
      time: 4174,
      id: '5ad3b1be1c06a61a302fe853',
      '5ab221c986b56615e0c5ba59': {
        taskName: 'Reading: Working Effectively With Legacy Code',
        time: 4174,
        id: '5ab221c986b56615e0c5ba59'
      }
    }
  ],
  dataSent: true
};

describe('Dashboard Reducer', () => {
  test('Get dashboard data', () => {
    const result = dashboard({}, { type: GET_DASHBOARD_DATA, response });
    expect(result).toEqual(response);
  });
});
