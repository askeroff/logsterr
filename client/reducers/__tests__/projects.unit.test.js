import { projects } from '../projects';
import { GET_PROJECTS } from '../../actions/actionTypes';

const projectsList = [
  {
    _id: '5a2694c6ee7544097c707d1c',
    name: 'French',
    author: '59bc1b5c5ee11d1964a214ec',
    __v: 0,
    parent_id: '',
    timeSpent: 21346
  },
  {
    _id: '5a281df108567500ade59253',
    name: 'Coding',
    author: '59bc1b5c5ee11d1964a214ec',
    __v: 0,
    parent_id: '',
    timeSpent: 274880
  },
  {
    _id: '5a2a1703a2efd310b8225595',
    name: 'Guitar',
    author: '59bc1b5c5ee11d1964a214ec',
    __v: 0,
    parent_id: '',
    timeSpent: 532060
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
    _id: '5ad3b1be1c06a61a302fe853',
    name: 'Books && Courses',
    author: '59bc1b5c5ee11d1964a214ec',
    __v: 0,
    parent_id: '5a281df108567500ade59253',
    timeSpent: 45399
  },
  {
    _id: '5ad79de1e1d0a410c4f2834e',
    name: 'JustinGuitar - Beginner Course',
    author: '59bc1b5c5ee11d1964a214ec',
    __v: 0,
    parent_id: '5a2a1703a2efd310b8225595',
    timeSpent: 360023
  }
];

describe('Projects Reducer', () => {
  test('Get projects list', () => {
    const response = { data: {} };
    response.data.projectsList = projectsList;
    const result = projects([], { type: GET_PROJECTS, response });
    expect(result).toEqual(projectsList);
  });
});
