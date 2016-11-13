import {
  SET_PROJECTS,
  UPDATE_PROJECT,
  UPDATE_PROJECT_PROGRESS,
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

export function updateProjectProgress(projectPath, inProgress) {
  return {
    type: UPDATE_PROJECT_PROGRESS,
    projectPath,
    inProgress,
  };
}
