import { tasks } from '../tasks';
import {
  GET_TASKS,
  NEW_TASK,
  DELETE_TASK,
  TOGGLE_DONE
} from '../../actions/actionTypes';

const tasksList = {
  list: [
    {
      _id: '5a394bd1cec11c01124d8783',
      name: 'Coding timetracker!',
      project: '5a281df108567500ade59253',
      __v: 0,
      updated: '2018-11-16T04:39:39.707Z',
      created: '2017-12-19T17:26:41.961Z',
      timeSpent: 170088,
      deleted: false,
      done: false
    },
    {
      _id: '5a7ed3a09cde19302cd34c05',
      name: 'The Complete React Native and Redux Course (Udemy)',
      project: '5a281df108567500ade59253',
      __v: 0,
      updated: '2018-11-16T04:40:30.798Z',
      created: '2018-02-10T11:12:32.500Z',
      timeSpent: 1210,
      deleted: false,
      done: false
    }
  ],
  project: {
    _id: '5a281df108567500ade59253',
    name: 'Coding',
    author: '59bc1b5c5ee11d1964a214ec',
    __v: 0,
    parent_id: '',
    timeSpent: 477450,
    done: false
  }
};

const myProject = {
  _id: '5a281df108567500ade59253',
  name: 'Coding',
  author: '59bc1b5c5ee11d1964a214ec',
  __v: 0,
  parent_id: '',
  timeSpent: 477450,
  initialTime: 477450,
  done: false
};

describe('Tests Reducers', () => {
  test.only('Get Tasks Action', () => {
    const action = {
      type: GET_TASKS,
      response: tasksList
    };
    const result = tasks({ list: [] }, action);
    expect(result).toEqual({
      list: tasksList.list,
      project: myProject,
      isFetching: false
    });
  });

  test('New Task', () => {
    const action = {
      type: NEW_TASK,
      task: {
        __v: 0,
        name: 'Testing Task',
        project: '5a281df108567500ade59253',
        _id: '5bf12d1da424a88eac38cf40',
        updated: '2018-11-18T09:13:01.967Z',
        created: '2018-11-18T09:13:01.967Z',
        timeSpent: 0,
        deleted: false,
        done: false
      }
    };
    const result = tasks({ list: tasksList.list, project: myProject }, action);
    const newArray = [...tasksList.list, action.task];
    expect(result).toEqual({ list: newArray, project: myProject });
  });

  test('Delete Task', () => {
    const action = {
      type: DELETE_TASK,
      id: '5a303c1f2388b30f1c175dba'
    };
    const result = tasks({ list: tasksList.list }, action);
    const shouldBe = [...tasksList.list].filter(item => item._id !== action.id);
    expect(result).toEqual({ list: shouldBe });
  });

  test('Toggle Done', () => {
    const action = {
      type: TOGGLE_DONE,
      id: '5a303c1f2388b30f1c175dba',
      done: true
    };
    const result = tasks({ list: tasksList.list }, action);
    const find = result.list.find(item => item._id === action.id);
    expect(find).toBe(undefined);
  });
});
