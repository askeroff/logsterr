// @flow

export interface IRenameTask {
  id: string;
  name: string;
  newProject: string;
  currentProject?: string;
  timeSpent?: number;
  moveTime?: boolean;
  deleteTime?: boolean;
}

export interface ISomethingElse {
  id: string;
  name: string;
  project: string;
  moveTime?: boolean;
  deleteTime?: boolean;
}

export interface ITimeLogData {
  seconds: number;
  name: string;
  task: string;
  done: boolean;
  project: string;
}
