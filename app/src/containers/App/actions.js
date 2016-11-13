import {
  SET_PROJECTS,
} from './constants';

export function setProjects(projects) {
  return {
    type: SET_PROJECTS,
    projects,
  };
}
