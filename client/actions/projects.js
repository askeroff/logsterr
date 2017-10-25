/* eslint import/prefer-default-export: "off" */
import { GET_PROJECTS } from '../actions/actionTypes';

export function getProjects(authorID) {
  return {
    type: GET_PROJECTS,
    authorID,
  };
}
