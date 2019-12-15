import { projects } from '../projects';
import {
  GET_PROJECTS,
  ADD_PROJECT,
  DELETE_PROJECT,
  TOGGLE_PROJECT_DONE,
  RENAME_PROJECT
} from '../../actions/actionTypes';

const projectsList = [
  {
    _id: '5a2694c6ee7544097c707d1c',
    name: 'French',
    author: '59bc1b5c5ee11d1964a214ec',
    __v: 0,
    parent_id: '',
    done: false,
    timeSpent: 21346
  },
  {
    _id: '5a281df108567500ade59253',
    name: 'Coding',
    author: '59bc1b5c5ee11d1964a214ec',
    __v: 0,
    parent_id: '',
    done: false,
    timeSpent: 274880
  },
  {
    _id: '5a2a1703a2efd310b8225595',
    name: 'Guitar',
    author: '59bc1b5c5ee11d1964a214ec',
    __v: 0,
    parent_id: '',
    done: false,
    timeSpent: 532060
  },
  {
    _id: '5a2a5dd7a2efd310b82255a1',
    name: 'Math',
    author: '59bc1b5c5ee11d1964a214ec',
    __v: 0,
    parent_id: '',
    done: false,
    timeSpent: 1587
  },
  {
    _id: '5a2a5ddea2efd310b82255a2',
    name: 'Science',
    author: '59bc1b5c5ee11d1964a214ec',
    __v: 0,
    parent_id: '',
    done: false,
    timeSpent: 0
  },
  {
    _id: '5a2a5de3a2efd310b82255a3',
    name: 'Drawing',
    author: '59bc1b5c5ee11d1964a214ec',
    __v: 0,
    parent_id: '',
    done: false,
    timeSpent: 0
  },
  {
    _id: '5ad3b1be1c06a61a302fe853',
    name: 'Books && Courses',
    author: '59bc1b5c5ee11d1964a214ec',
    __v: 0,
    parent_id: '5a281df108567500ade59253',
    done: false,
    timeSpent: 45399
  },
  {
    _id: '5ad79de1e1d0a410c4f2834e',
    name: 'JustinGuitar - Beginner Course',
    author: '59bc1b5c5ee11d1964a214ec',
    __v: 0,
    parent_id: '5a2a1703a2efd310b8225595',
    done: false,
    timeSpent: 360023
  }
];

describe('Projects Reducer', () => {
  test('Get projects list', () => {
    const response = { data: {} };
    response.data.projectsList = projectsList;
    const result = projects({}, { type: GET_PROJECTS, response });
    expect(result).toEqual({ list: projectsList, isFetching: false });
  });

  test('Add a project', () => {
    const action = {
      type: ADD_PROJECT,
      project: {
        __v: 0,
        name: 'Test',
        author: '59bc1b5c5ee11d1964a214ec',
        _id: '5b22d8416196e41cd4264d96',
        parent_id: '',
        timeSpent: 0
      }
    };
    const result = projects({ list: projectsList }, action);
    expect(result).toEqual({ list: [...projectsList, action.project] });
  });

  test('Delete a project', () => {
    const action = {
      type: DELETE_PROJECT,
      id: '5ad79de1e1d0a410c4f2834e'
    };
    const result = projects({ list: projectsList }, action);
    expect(result.list.length).toBe(projectsList.length - 1);
  });

  test('Rename a project', () => {
    const action = {
      type: RENAME_PROJECT,
      project: {
        id: '5a2694c6ee7544097c707d1c',
        name: 'Renamed French'
      }
    };
    const result = projects({ list: projectsList }, action);
    const find = result.list.find(item => item._id === action.project.id);
    expect(find.name).toBe('Renamed French');
  });

  test('Toggle projects done state to true', () => {
    const action = {
      type: TOGGLE_PROJECT_DONE,
      id: '5ad79de1e1d0a410c4f2834e',
      done: true
    };
    const result = projects({ list: projectsList }, action);
    const find = result.list.find(item => item._id === action.id);
    expect(find.done).toBe(true);

    const action2 = {
      type: TOGGLE_PROJECT_DONE,
      id: '5ad79de1e1d0a410c4f2834e',
      done: false
    };
    const result2 = projects({ list: projectsList }, action2);
    const find2 = result2.list.find(item => item._id === action.id);
    expect(find2.done).toBe(false);
  });
});
