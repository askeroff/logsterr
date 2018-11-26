import { tasks } from '../tasks';
import {
  GET_TASKS,
  NEW_TASK,
  DELETE_TASK,
  EDIT_TASK,
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

const codingProject = {
  _id: '5a281df108567500ade59253',
  name: 'Coding',
  author: '59bc1b5c5ee11d1964a214ec',
  __v: 0,
  parent_id: '',
  timeSpent: 477450,
  initialTime: 477450,
  done: false
};

const anotherProject = {
  _id: '5ad3b1be1c06a61a302fe853',
  name: 'Books && Courses',
  author: '59bc1b5c5ee11d1964a214ec',
  __v: 0,
  parent_id: '',
  timeSpent: 164736,
  initialTime: 164736,
  done: false
};

describe('Tests Reducers', () => {
  test('Get Tasks Action', () => {
    const action = {
      type: GET_TASKS,
      response: tasksList
    };
    const result = tasks({ list: [] }, action);
    expect(result).toEqual({
      list: [{ doneList: undefined, list: tasksList.list, project: codingProject }],
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
    const result = tasks(
      {
        list: [
          { doneList: undefined, list: tasksList.list, project: codingProject }
        ],
        isFetching: false
      },
      action
    );
    const newArray = [...tasksList.list, action.task];
    expect(result).toEqual({
      list: [{ doneList: undefined, list: newArray, project: codingProject }],
      isFetching: false
    });
  });

  test('Delete Task', () => {
    const action = {
      type: DELETE_TASK,
      projectId: '5a281df108567500ade59253',
      id: '5a303c1f2388b30f1c175dba'
    };
    const result = tasks(
      {
        list: [
          { doneList: undefined, list: tasksList.list, project: codingProject }
        ],
        isFetching: false
      },
      action
    );
    const shouldBe = [...tasksList.list].filter(item => item._id !== action.id);
    expect(result).toEqual({
      list: [{ doneList: undefined, list: shouldBe, project: codingProject }],
      isFetching: false
    });
  });

  test('Editing task - just renaming', () => {
    const action = {
      type: EDIT_TASK,
      id: '5a7ed3a09cde19302cd34c05',
      currentProject: '5a281df108567500ade59253',
      newProject: '5a281df108567500ade59253',
      name: 'New Name'
    };
    const result = tasks(
      {
        list: [
          { doneList: undefined, list: tasksList.list, project: codingProject }
        ],
        isFetching: false
      },
      action
    );
    const shouldBe = [...tasksList.list].map(item => {
      const newItem = { ...item };
      if (item._id === action.id) {
        newItem.name = action.name;
      }
      return newItem;
    });
    expect(result).toEqual({
      list: [{ doneList: undefined, list: shouldBe, project: codingProject }],
      isFetching: false
    });
  });

  test('Editing task - move to a new project', () => {
    const action = {
      type: EDIT_TASK,
      id: '5a7ed3a09cde19302cd34c05',
      currentProject: '5a281df108567500ade59253',
      newProject: '5ad3b1be1c06a61a302fe853',
      name: 'New Name!!!',
      timeSpent: 1210,
      moveTime: true,
      deleteTime: true
    };
    const result = tasks(
      {
        list: [
          { doneList: undefined, list: tasksList.list, project: codingProject },
          { doneList: undefined, list: [], project: anotherProject }
        ],
        isFetching: false
      },
      action
    );
    // first the task should be removed from the initial project
    let task;
    const fromProjectList = [...tasksList.list].filter(item => {
      if (item._id === action.id) {
        task = { ...item };
      }
      return item._id !== action.id;
    });
    task.name = action.name;
    // and be present in the project which it was moved to
    expect(result).toEqual({
      list: [
        {
          doneList: undefined,
          list: fromProjectList,
          project: codingProject
        },
        {
          doneList: undefined,
          list: [task],
          project: anotherProject
        }
      ],
      isFetching: false
    });
  });

  test('Toggle Task Done State', () => {
    const action = {
      type: TOGGLE_DONE,
      id: '5a394bd1cec11c01124d8783',
      projectId: '5a281df108567500ade59253',
      done: true
    };
    const result = tasks(
      {
        list: [{ doneList: [], list: tasksList.list, project: codingProject }],
        isFetching: false
      },
      action
    );
    let task;
    const filteredList = tasksList.list.filter(item => {
      if (item._id === '5a394bd1cec11c01124d8783') {
        task = item;
        task.done = true;
      }
      return item._id !== '5a394bd1cec11c01124d8783';
    });
    expect(result).toEqual({
      list: [{ doneList: [task], list: filteredList, project: codingProject }],
      isFetching: false
    });
  });
});
