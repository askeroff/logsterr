// @flow

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
  parent_id: string;
  timeSpent: number;
}

export interface IUser {
  loggedIn: boolean;
  _id: string;
  email: string;
  error: string;
}
