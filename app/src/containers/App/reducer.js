import {
  SET_PROJECTS,
  UPDATE_PROJECT,
} from './constants';

import {
  SELECT_PROJECT,
} from '../Selection/constants';

const initialState = {
  projects: [],
};

function replaceProject(projects, projectPath, results) {
  const projectToUpdate = {
    projectPath,
    results,
  };
  return projects.map(project => (project.projectPath === projectPath ? projectToUpdate : project));
}

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case SET_PROJECTS:
      return {
        ...state,
        projects: action.projects,
      };
    case SELECT_PROJECT:
      return {
        ...state,
        selectedProjectPath: action.projectPath,
      };
    case UPDATE_PROJECT:
      return {
        ...state,
        projects: replaceProject(state.projects, action.projectPath, action.results),
      };
    default:
      return state;
  }
}
