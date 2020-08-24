

export interface ITask {
  _id: string;
  name: string;
  project: string;
  __v: number;
  updated: string;
  created: string;
  timeSpent: number;
  done: boolean;
}

export interface IProject {
  _id: string;
  name: string;
  author: string;
  __v: number;
  done: boolean;
  parent_id: string;
  timeSpent: number;
}

export interface IUser {
  loggedIn: boolean;
  _id: string;
  startsDay: number;
  email: string;
  error: string;
}

export interface IMatch {
  isExact: boolean;
  params: {
    id: string
  };
  path: string;
  url: string;
}

export interface IRenameTask {
  id: string;
  name: string;
  newProject: string;
  currentProject?: string;
  timeSpent?: number;
  moveTime?: boolean;
  deleteTime?: boolean;
}

export interface ITimeLogData {
  seconds: number;
  task: string;
  done: boolean;
  project: string;
}
