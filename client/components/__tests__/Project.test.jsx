import React from 'react';
import { render, cleanup } from 'react-testing-library';
import * as routerDOM from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../../store';
import Project from '../projects/Project';
import * as dashboard from '../../actions/dashboard';
import * as tasks from '../../actions/tasks';
import * as user from '../../actions/user';

const match = {
  params: {
    id: '5ad3b1be1c06a61a302fe853'
  }
};

const location = {
  pathname: ''
};

routerDOM.Link = props => <a>{props.children}</a>;

dashboard.getMotivationData = function getMotivationData() {
  return dispatch =>
    dispatch({
      type: 'GET_MOTIVATION_DATA',
      response: {
        lastWeek: {
          _id: '5ad3b1be1c06a61a302fe853',
          name: 'Books && Courses',
          author: '59bc1b5c5ee11d1964a214ec',
          parent_id: '5a281df108567500ade59253',
          timeSpent: 159127,
          __v: 0,
          children: [],
          tasks: [
            {
              _id: '5be9424aedf507561cfb4379',
              task: '5bc39e4a8a75cf182c0baf04',
              project: '5ad3b1be1c06a61a302fe853',
              started: '2018-11-12T09:05:14.471Z',
              seconds: 19769,
              projectdata: [
                {
                  _id: '5ad3b1be1c06a61a302fe853',
                  name: 'Books && Courses',
                  author: '59bc1b5c5ee11d1964a214ec',
                  parent_id: '5a281df108567500ade59253',
                  timeSpent: 159127,
                  __v: 0
                }
              ],
              taskName: 'Advanced React & GraphQL w/ Wes Bos'
            },
            {
              _id: '5beeaaeabb3a901ffcf2cede',
              task: '5beea3b3bb3a901ffcf2cedd',
              project: '5ad3b1be1c06a61a302fe853',
              started: '2018-11-16T11:32:58.406Z',
              seconds: 7358,
              projectdata: [
                {
                  _id: '5ad3b1be1c06a61a302fe853',
                  name: 'Books && Courses',
                  author: '59bc1b5c5ee11d1964a214ec',
                  parent_id: '5a281df108567500ade59253',
                  timeSpent: 159127,
                  __v: 0
                }
              ],
              taskName: 'Grokking Algorithms'
            }
          ],
          seconds: 27127
        },
        thisWeek: {
          _id: '5ad3b1be1c06a61a302fe853',
          name: 'Books && Courses',
          author: '59bc1b5c5ee11d1964a214ec',
          parent_id: '5a281df108567500ade59253',
          timeSpent: 159127,
          __v: 0,
          children: [],
          tasks: [
            {
              _id: '5bf2707a40e5138a90cccdda',
              task: '5beea3b3bb3a901ffcf2cedd',
              project: '5ad3b1be1c06a61a302fe853',
              started: '2018-11-19T08:12:42.452Z',
              seconds: 912,
              projectdata: [
                {
                  _id: '5ad3b1be1c06a61a302fe853',
                  name: 'Books && Courses',
                  author: '59bc1b5c5ee11d1964a214ec',
                  parent_id: '5a281df108567500ade59253',
                  timeSpent: 159127,
                  __v: 0
                }
              ],
              taskName: 'Grokking Algorithms'
            }
          ],
          seconds: 912
        },
        dataSent: true
      }
    });
};

user.isLoggedIn = function isLoggedIn() {
  return dispatch =>
    dispatch({
      type: 'IS_LOGGED_IN',
      user: {
        loggedIn: true,
        _id: '59bc1b5c5ee11d1964a214ec',
        email: 'askerovlab@gmail.com',
        __v: 0,
        error: ''
      }
    });
};

tasks.getTasks = function getTasks() {
  return dispatch =>
    dispatch({
      type: 'GET_TASKS',
      response: {
        list: [
          {
            _id: '5bd43797d81edd9f7c383c1d',
            name: 'The Gang Of Four Book Design Patterns',
            project: '5ad3b1be1c06a61a302fe853',
            __v: 0,
            updated: '2018-10-27T10:01:59.275Z',
            created: '2018-10-27T10:01:59.275Z',
            timeSpent: 1277,
            deleted: false,
            done: false
          },
          {
            _id: '5a3e6f0e6c4f980a4cc65ae4',
            name: 'Reading: Cracking The Coding Interview',
            project: '5ad3b1be1c06a61a302fe853',
            __v: 0,
            updated: '2017-12-23T14:58:22.516Z',
            created: '2017-12-23T14:58:22.516Z',
            timeSpent: 6120,
            deleted: false,
            done: false
          },
          {
            _id: '5a50a56f2df2b024982b0545',
            name: 'YDKJS Books!',
            project: '5ad3b1be1c06a61a302fe853',
            __v: 0,
            updated: '2018-02-07T18:16:46.303Z',
            created: '2018-01-06T10:31:11.613Z',
            timeSpent: 33861,
            deleted: false,
            done: false
          },
          {
            _id: '5ab221c986b56615e0c5ba59',
            name: 'Reading: Working Effectively With Legacy Code',
            project: '5ad3b1be1c06a61a302fe853',
            __v: 0,
            updated: '2018-03-21T09:11:37.523Z',
            created: '2018-03-21T09:11:37.523Z',
            timeSpent: 14383,
            deleted: false,
            done: false
          },
          {
            _id: '5b2ab37c8c066f2be8f1d0b8',
            name: 'React Native and Redux Course',
            project: '5ad3b1be1c06a61a302fe853',
            __v: 0,
            updated: '2018-06-20T20:05:16.356Z',
            created: '2018-06-20T20:05:16.355Z',
            timeSpent: 4297,
            deleted: false,
            done: false
          },
          {
            _id: '5beea3b3bb3a901ffcf2cedd',
            name: 'Grokking Algorithms',
            project: '5ad3b1be1c06a61a302fe853',
            __v: 0,
            updated: '2018-11-16T11:02:11.347Z',
            created: '2018-11-16T11:02:11.347Z',
            timeSpent: 8270,
            deleted: false,
            done: false
          }
        ],
        project: {
          _id: '5ad3b1be1c06a61a302fe853',
          name: 'Books && Courses',
          author: '59bc1b5c5ee11d1964a214ec',
          __v: 0,
          parent_id: '5a281df108567500ade59253',
          timeSpent: 159127,
          done: false,
          initialTime: 159127
        },
        isFetching: false
      }
    });
};

tasks.clearTasks = function getTasks() {
  return dispatch =>
    dispatch({
      type: 'CLEAR_TASKS',
      response: []
    });
};

const Component = () => (
  <Provider store={store}>
    <Project location={location} match={match} />
  </Provider>
);

describe('Project Component Integration Test', () => {
  test('Project Component Renders', async () => {
    // eslint-disable-next-line
    const component = render(<Component />);
  });

  afterEach(cleanup);
});
