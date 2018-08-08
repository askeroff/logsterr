/* eslint no-unused-vars: 0 */ // --> OFF

import prepareStatsData from '../common/prepareStatsData';

const timelogs = [
  {
    _id: '5b5244d69a1d5d81041cb50f',
    name: 'Duolingo',
    task: '5a50b29f2df2b024982b0548',
    project: '5a2694c6ee7544097c707d1c',
    author: '59bc1b5c5ee11d1964a214ec',
    __v: 0,
    started: '2018-07-20T20:23:50.375Z',
    seconds: 388,
    done: true
  },
  {
    _id: '5b524a699a1d5d81041cb510',
    name: 'YDKJS Books!',
    task: '5a50a56f2df2b024982b0545',
    project: '5ad3b1be1c06a61a302fe853',
    author: '59bc1b5c5ee11d1964a214ec',
    __v: 0,
    started: '2018-07-20T20:47:37.846Z',
    seconds: 540,
    done: true
  }
];

const projects = [
  {
    _id: '5ad3b1be1c06a61a302fe853',
    name: 'Books && Courses',
    author: '59bc1b5c5ee11d1964a214ec',
    __v: 0,
    parent_id: '5a281df108567500ade59253',
    timeSpent: 53143
  },
  {
    _id: '5a281df108567500ade59253',
    name: 'Coding',
    author: '59bc1b5c5ee11d1964a214ec',
    __v: 0,
    parent_id: '',
    timeSpent: 311339
  },
  {
    _id: '5a2a5de3a2efd310b82255a3',
    name: 'Drawing',
    author: '59bc1b5c5ee11d1964a214ec',
    __v: 0,
    parent_id: '',
    timeSpent: 0
  },
  {
    _id: '5a2694c6ee7544097c707d1c',
    name: 'French',
    author: '59bc1b5c5ee11d1964a214ec',
    __v: 0,
    parent_id: '',
    timeSpent: 29153
  },
  {
    _id: '5a2a1703a2efd310b8225595',
    name: 'Guitar',
    author: '59bc1b5c5ee11d1964a214ec',
    __v: 0,
    parent_id: '',
    timeSpent: 629918
  },
  {
    _id: '5b381f4aaa44625bdc58f44e',
    name: 'JG - Iintermediate Foundation',
    author: '59bc1b5c5ee11d1964a214ec',
    __v: 0,
    parent_id: '5a2a1703a2efd310b8225595',
    timeSpent: 8699
  },
  {
    _id: '5ad79de1e1d0a410c4f2834e',
    name: 'JustinGuitar - Beginner Course',
    author: '59bc1b5c5ee11d1964a214ec',
    __v: 0,
    parent_id: '5a2a1703a2efd310b8225595',
    timeSpent: 445936
  },
  {
    _id: '5b4f757a68806c43b4277be0',
    name: 'Learning Songs',
    author: '59bc1b5c5ee11d1964a214ec',
    __v: 0,
    parent_id: '5a2a1703a2efd310b8225595',
    timeSpent: 2646
  },
  {
    _id: '5a2a5dd7a2efd310b82255a1',
    name: 'Math',
    author: '59bc1b5c5ee11d1964a214ec',
    __v: 0,
    parent_id: '',
    timeSpent: 1587
  },
  {
    _id: '5a2a5ddea2efd310b82255a2',
    name: 'Science',
    author: '59bc1b5c5ee11d1964a214ec',
    __v: 0,
    parent_id: '',
    timeSpent: 0
  }
];

/*
 Let's explore the shape of the result I want to get
 const = [
   {
     project: "Guitar",
     time: 2 hours,
     tasks: [],
     children: [{project: string, time: number, children: arr}]
   }
 ]
*/

const expectedResult = [
  {
    project: '5a2694c6ee7544097c707d1c',
    time: 388,
    tasks: [
      {
        _id: '5b5244d69a1d5d81041cb50f',
        name: 'Duolingo',
        task: '5a50b29f2df2b024982b0548',
        project: '5a2694c6ee7544097c707d1c',
        author: '59bc1b5c5ee11d1964a214ec',
        __v: 0,
        started: '2018-07-20T20:23:50.375Z',
        seconds: 388,
        done: true
      }
    ],
    children: []
  },
  {
    project: '5a281df108567500ade59253',
    time: 540,
    tasks: [],
    children: [
      {
        project: '5ad3b1be1c06a61a302fe853',
        time: 540,
        tasks: [
          {
            _id: '5b524a699a1d5d81041cb510',
            name: 'YDKJS Books!',
            task: '5a50a56f2df2b024982b0545',
            project: '5ad3b1be1c06a61a302fe853',
            author: '59bc1b5c5ee11d1964a214ec',
            __v: 0,
            started: '2018-07-20T20:47:37.846Z',
            seconds: 540,
            done: true
          }
        ],
        children: []
      }
    ]
  }
];

test('Initial test', () => {
  const found = prepareStatsData(timelogs, projects);
  expect(found).toEqual(expectedResult);
});
