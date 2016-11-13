import { ipcRenderer } from 'electron';

import {
  SET_PROJECTS,
  UPDATE_PROJECT,
  UPDATE_PROJECT_PROGRESS,
  ADD_PROJECT,
  DELETE_PROJECT,
} from './constants';

export function initializeProject(projectPath) {
  return {
    type: ADD_PROJECT,
    projectPath,
    stats: {},
    tests: [],
    inProgress: true,
  };
}

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

export function deleteProject(projectPath) {
  return {
    type: DELETE_PROJECT,
    projectPath,
  };
}
