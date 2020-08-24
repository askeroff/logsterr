export interface Task {
  _id: string;
  name: string;
  project: string;
  __v: number;
  updated: string;
  created: string;
  timeSpent: number;
  done: boolean;
}

export interface Project {
  _id: string;
  name: string;
  author: string;
  __v: number;
  done: boolean;
  parent_id: string;
  timeSpent: number;
}

export interface User {
  loggedIn: boolean;
  _id: string;
  startsDay: number;
  email: string;
  error: string;
}

export interface Match {
  isExact: boolean;
  params: {
    id: string;
  };
  path: string;
  url: string;
}

export interface RenameTask {
  id: string;
  name: string;
  newProject: string;
  currentProject?: string;
  timeSpent?: number;
  moveTime?: boolean;
  deleteTime?: boolean;
}

export interface TimeLogData {
  seconds: number;
  task: string;
  done: boolean;
  project: string;
}
