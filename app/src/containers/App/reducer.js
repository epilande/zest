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
    ...results,
  };

  const foundProjectIndex = projects.findIndex(project => project.projectPath === projectPath);

  if (foundProjectIndex < 0) {
    return projects.concat(projectToUpdate);
  }

  return [
    ...projects.slice(0, foundProjectIndex),
    projectToUpdate,
    ...projects.slice(foundProjectIndex + 1),
  ];
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
      const { projectPath, type, ...results } = action;
      return {
        ...state,
        projects: replaceProject(state.projects, projectPath, results),
      };
    default:
      return state;
  }
}
