"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var react_testing_library_1 = require("react-testing-library");
var routerDOM = require("react-router-dom");
var store_1 = require("../../store");
var dashboard = require("../../actions/dashboard");
var tasks = require("../../actions/tasks");
var user = require("../../actions/user");
var match = {
    params: {
        id: '5ad3b1be1c06a61a302fe853'
    }
};
var location = {
    pathname: ''
};
routerDOM.Link = function (props) { return ({ props: props, : .children } < /a>;); };
dashboard.getMotivationData = function getMotivationData() {
    return function (dispatch) {
        return dispatch({
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
};
user.isLoggedIn = function isLoggedIn() {
    return function (dispatch) {
        return dispatch({
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
};
tasks.getTasks = function getTasks() {
    return function (dispatch) {
        return dispatch({
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
};
tasks.clearTasks = function getTasks() {
    return function (dispatch) {
        return dispatch({
            type: 'CLEAR_TASKS',
            response: []
        });
    };
};
var Component = function () { return store_1.store = { store: store_1.store } >
    location; }, location = (void 0).location, match = { match: match } /  >
    /Provider>;
;
describe('Project Component Integration Test', function () {
    test('Project Component Renders', function () { return __awaiter(void 0, void 0, void 0, function () {
        var component;
        return __generator(this, function (_a) {
            component = react_testing_library_1.render(/>););
            return [2 /*return*/];
        });
    }); });
    afterEach(react_testing_library_1.cleanup);
});
