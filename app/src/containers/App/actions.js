import {
  SET_PROJECTS,
  UPDATE_PROJECT,
} from './constants';

export function setProjects(projects) {
  return {
    type: SET_PROJECTS,
    projects,
  };
}

export function updateProject(projectPath, results) {
  return {
    type: UPDATE_PROJECT,
    projectPath,
    results,
  };
}
