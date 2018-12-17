/* eslint no-unused-vars: 0 */ // --> OFF

import prepareStatsData from '../common/prepareStatsData';
import { projects, timelogs } from './fakeData';

const expectedResult = [
  {
    _id: '5a281df108567500ade59253',
    name: 'Coding',
    author: '59bc1b5c5ee11d1964a214ec',
    timeSpent: 414404,
    __v: 0,
    parent_id: '',
    children: [
      {
        _id: '5ad3b1be1c06a61a302fe853',
        name: 'Books && Courses',
        author: '59bc1b5c5ee11d1964a214ec',
        parent_id: '5a281df108567500ade59253',
        timeSpent: 118487,
        __v: 0,
        children: [],
        tasks: [
          {
            _id: '5bd85d246396aa9724b815c9',
            name: 'Task Code Course',
            task: '5bc39e4a8a75cf182c0baf04',
            project: '5ad3b1be1c06a61a302fe853',
            author: '59bc1b5c5ee11d1964a214ec',
            started: '2018-10-30T13:31:16.484Z',
            seconds: 2880,
            done: true,
            __v: 0
          }
        ],
        seconds: 2880
      },
      {
        _id: '5b8ffcaa50c21b88e85fd773',
        name: 'Some Code Project',
        author: '59bc1b5c5ee11d1964a214ec',
        parent_id: '5a281df108567500ade59253',
        timeSpent: 10136,
        done: true,
        __v: 0,
        children: []
      },
      {
        _id: '5bbae3dbc253781b683f3123',
        name: 'Open Source',
        author: '59bc1b5c5ee11d1964a214ec',
        parent_id: '5a281df108567500ade59253',
        timeSpent: 0,
        done: false,
        __v: 0,
        children: []
      },
      {
        _id: '5bd6bfb2c3b4bc53203c3098',
        name: 'FreeCodeCamp',
        author: '59bc1b5c5ee11d1964a214ec',
        parent_id: '5a281df108567500ade59253',
        timeSpent: 6735,
        done: false,
        __v: 0,
        children: [],
        tasks: [
          {
            _id: '5bd6c3dfc3b4bc53203c309a',
            name: 'Task Code',
            task: '5bd6bfc5c3b4bc53203c3099',
            project: '5bd6bfb2c3b4bc53203c3098',
            author: '59bc1b5c5ee11d1964a214ec',
            started: '2018-10-29T08:25:03.118Z',
            seconds: 6735,
            done: true,
            __v: 0
          }
        ],
        seconds: 6735
      }
    ],
    seconds: 13215,
    tasks: [
      {
        _id: '5bd826db6396aa9724b815c6',
        name: 'Task Another Code',
        task: '5a394bd1cec11c01124d8783',
        project: '5a281df108567500ade59253',
        author: '59bc1b5c5ee11d1964a214ec',
        started: '2018-10-30T09:39:39.782Z',
        seconds: 3600,
        done: true,
        __v: 0
      }
    ]
  },
  {
    _id: '5a2a5ddea2efd310b82255a2',
    name: 'Science',
    author: '59bc1b5c5ee11d1964a214ec',
    timeSpent: 0,
    __v: 0,
    parent_id: '',
    children: []
  },
  {
    _id: '5a2a5de3a2efd310b82255a3',
    name: 'Drawing',
    author: '59bc1b5c5ee11d1964a214ec',
    timeSpent: 0,
    __v: 0,
    parent_id: '',
    children: []
  },
  {
    _id: '5a2694c6ee7544097c707d1c',
    name: 'French',
    author: '59bc1b5c5ee11d1964a214ec',
    timeSpent: 35803,
    __v: 0,
    parent_id: '',
    children: []
  },
  {
    _id: '5a2a5dd7a2efd310b82255a1',
    name: 'Math',
    author: '59bc1b5c5ee11d1964a214ec',
    timeSpent: 1587,
    __v: 0,
    parent_id: '',
    children: []
  },
  {
    _id: '5b6875375b7dd92a9cc1aa79',
    name: 'Books',
    author: '59bc1b5c5ee11d1964a214ec',
    parent_id: '',
    timeSpent: 22202,
    __v: 0,
    done: false,
    children: []
  },
  {
    _id: '5a2a1703a2efd310b8225595',
    name: 'Guitar',
    author: '59bc1b5c5ee11d1964a214ec',
    timeSpent: 806544,
    __v: 0,
    parent_id: '',
    children: [
      {
        _id: '5ad79de1e1d0a410c4f2834e',
        name: 'Guitar X',
        author: '59bc1b5c5ee11d1964a214ec',
        parent_id: '5a2a1703a2efd310b8225595',
        timeSpent: 446536,
        __v: 0,
        done: true,
        children: []
      },
      {
        _id: '5b381f4aaa44625bdc58f44e',
        name: 'Guitar Y',
        author: '59bc1b5c5ee11d1964a214ec',
        parent_id: '5a2a1703a2efd310b8225595',
        timeSpent: 99150,
        __v: 0,
        children: [
          {
            _id: '5bd9ab2d634fd02054655d46',
            name: 'Test',
            author: '59bc1b5c5ee11d1964a214ec',
            parent_id: '5b381f4aaa44625bdc58f44e',
            timeSpent: 600,
            done: false,
            __v: 0,
            children: [],
            tasks: [
              {
                _id: '5bdbd476807d285c7ca08796',
                name: 'Test',
                task: '5bd9ab36634fd02054655d48',
                project: '5bd9ab2d634fd02054655d46',
                author: '59bc1b5c5ee11d1964a214ec',
                started: '2018-11-02T04:37:10.852Z',
                seconds: 600,
                done: true,
                __v: 0
              }
            ],
            seconds: 600
          }
        ],
        tasks: [
          {
            _id: '5bd85e0e6396aa9724b815ca',
            name: 'Finger Exercises',
            task: '5b81558a736e028c48e0704e',
            project: '5b381f4aaa44625bdc58f44e',
            author: '59bc1b5c5ee11d1964a214ec',
            started: '2018-10-30T13:35:10.800Z',
            seconds: 221,
            done: true,
            __v: 0
          }
        ],
        seconds: 821
      },
      {
        _id: '5b4f757a68806c43b4277be0',
        name: 'Learning Songs',
        author: '59bc1b5c5ee11d1964a214ec',
        parent_id: '5a2a1703a2efd310b8225595',
        timeSpent: 84621,
        __v: 0,
        children: [],
        tasks: [
          {
            _id: '5bd73707c3b4bc53203c30a0',
            name: 'Task Song',
            task: '5bb8b5c5c253781b683f311d',
            project: '5b4f757a68806c43b4277be0',
            author: '59bc1b5c5ee11d1964a214ec',
            started: '2018-10-29T16:36:23.844Z',
            seconds: 7080,
            done: true,
            __v: 0
          }
        ],
        seconds: 7080
      }
    ],
    seconds: 7901
  }
];

test('Initial test', () => {
  const found = prepareStatsData(timelogs, projects);
  expect(found).toEqual(expectedResult);
});
