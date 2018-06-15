import { tasks } from '../tasks';
import {
  GET_TASKS,
  NEW_TASK,
  DELETE_TASK,
  TOGGLE_DONE
} from '../../actions/actionTypes';

const tasksList = [
  {
    _id: '5a303c1f2388b30f1c175dba',
    name: 'Coding Portfolio',
    project: '5a281df108567500ade59253',
    __v: 0,
    updated: '2017-12-23T14:58:06.873Z',
    created: '2017-12-12T20:29:19.730Z',
    timeSpent: 8128,
    done: true
  },
  {
    _id: '5a322da6616fca1cdccf6d24',
    name: 'Learning CSS with LevelUpTuts',
    project: '5a281df108567500ade59253',
    __v: 0,
    updated: '2017-12-23T14:58:01.388Z',
    created: '2017-12-14T07:52:06.361Z',
    timeSpent: 7837,
    done: true
  },
  {
    _id: '5a394bd1cec11c01124d8783',
    name: 'Coding timetracker',
    project: '5a281df108567500ade59253',
    __v: 0,
    updated: '2018-03-24T11:52:17.563Z',
    created: '2017-12-19T17:26:41.961Z',
    timeSpent: 115638,
    done: false
  },
  {
    _id: '5a3d806acec11c01124d878f',
    name: 'JS (Testing for Beginners) Marc Littlemore',
    project: '5a281df108567500ade59253',
    __v: 0,
    updated: '2017-12-23T10:57:59.884Z',
    created: '2017-12-22T22:00:10.219Z',
    timeSpent: 4680,
    done: true
  },
  {
    _id: '5a3e3ed86c4f980a4cc65add',
    name: 'Testing (FunFunFunction)',
    project: '5a281df108567500ade59253',
    __v: 0,
    updated: '2017-12-23T22:33:29.622Z',
    created: '2017-12-23T11:32:40.326Z',
    timeSpent: 3004,
    done: true
  },
  {
    _id: '5a3ed9dbec48170103871863',
    name: 'Course: Testing JS Apps (w React and Redux)',
    project: '5a281df108567500ade59253',
    __v: 0,
    updated: '2017-12-30T09:40:51.702Z',
    created: '2017-12-23T22:34:03.383Z',
    timeSpent: 20713,
    done: true
  },
  {
    _id: '5a8874d4ad4c5117f07ce997',
    name: 'Getting to know TypeScript',
    project: '5a281df108567500ade59253',
    __v: 0,
    updated: '2018-02-18T10:05:57.912Z',
    created: '2018-02-17T18:30:44.917Z',
    timeSpent: 1300,
    done: true
  },
  {
    _id: '5b16f72095029f47d4e471da',
    name: 'Chrome Extension: Youtube PL URL Replacer',
    project: '5a281df108567500ade59253',
    __v: 0,
    updated: '2018-06-05T20:48:32.810Z',
    created: '2018-06-05T20:48:32.810Z',
    timeSpent: 1800,
    done: false
  },
  {
    _id: '5a6233274a29dd299c25bde5',
    name: 'CSS Grid Course',
    project: '5a281df108567500ade59253',
    __v: 0,
    updated: '2018-02-07T17:13:35.629Z',
    created: '2018-01-19T18:04:23.057Z',
    timeSpent: 18165,
    done: true
  },
  {
    _id: '5a7df3169cde19302cd34c02',
    name: 'ChordChanges App (On Codepen)',
    project: '5a281df108567500ade59253',
    __v: 0,
    updated: '2018-02-09T19:14:30.729Z',
    created: '2018-02-09T19:14:30.729Z',
    timeSpent: 1673,
    done: false
  },
  {
    _id: '5a7ed3a09cde19302cd34c05',
    name: 'The Complete React Native and Redux Course (Udemy)',
    project: '5a281df108567500ade59253',
    __v: 0,
    updated: '2018-02-10T11:12:32.500Z',
    created: '2018-02-10T11:12:32.500Z',
    timeSpent: 1210,
    done: false
  },
  {
    _id: '5a82ebafad4c5117f07ce96f',
    name: 'Web Video Player',
    project: '5a281df108567500ade59253',
    __v: 0,
    updated: '2018-02-13T13:44:15.953Z',
    created: '2018-02-13T13:44:15.953Z',
    timeSpent: 5930,
    done: false
  },
  {
    _id: '5a895011ad4c5117f07ce999',
    name: 'TypeScript Course',
    project: '5a281df108567500ade59253',
    __v: 0,
    updated: '2018-03-24T10:16:05.031Z',
    created: '2018-02-18T10:06:09.522Z',
    timeSpent: 7120,
    done: true
  },
  {
    _id: '5a906a0d531e2e1308d5104f',
    name: 'Complete Intro To React v3 (FrontendMasters)',
    project: '5a281df108567500ade59253',
    __v: 0,
    updated: '2018-02-23T20:43:06.239Z',
    created: '2018-02-23T19:22:53.448Z',
    timeSpent: 3847,
    done: true
  }
];

describe('Tests Reducers', () => {
  test('Get Tasks Action', () => {
    const action = {
      type: GET_TASKS,
      response: tasksList
    };
    const result = tasks([], action);
    expect(result).toEqual(tasksList);
  });

  test('New Task', () => {
    const action = {
      type: NEW_TASK,
      task: {
        __v: 0,
        name: 'Test',
        project: '5a281df108567500ade59253',
        _id: '5b240c915524cd3accd42f85',
        updated: '2018-06-15T18:59:29.752Z',
        created: '2018-06-15T18:59:29.752Z',
        timeSpent: 0,
        done: false
      }
    };
    const result = tasks(tasksList, action);
    const newArray = [...tasksList, action.task];
    expect(result).toEqual(newArray);
  });

  test('Delete Task', () => {
    const action = {
      type: DELETE_TASK,
      id: '5a303c1f2388b30f1c175dba'
    };
    const result = tasks(tasksList, action);
    const shouldBe = [...tasksList].filter(item => item._id !== action.id);
    expect(result).toEqual(shouldBe);
  });

  test('Toggle Done', () => {
    const action = {
      type: TOGGLE_DONE,
      id: '5a303c1f2388b30f1c175dba',
      done: true
    };
    const result = tasks(tasksList, action);
    const find = result.find(item => item._id === action.id);
    expect(find.done).toBe(true);

    const action2 = {
      type: TOGGLE_DONE,
      id: '5a303c1f2388b30f1c175dba',
      done: false
    };

    const result2 = tasks(tasksList, action2);
    const find2 = result2.find(item => item._id === action.id);
    expect(find2.done).toBe(false);
  });
});
