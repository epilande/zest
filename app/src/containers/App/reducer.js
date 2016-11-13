import {
  SET_PROJECTS,
  UPDATE_PROJECT,
  UPDATE_PROJECT_PROGRESS,
  ADD_PROJECT,
} from './constants';

import {
  SELECT_PROJECT,
} from '../Selection/constants';

const initialState = {
  projects: [],
};

function updateProjectProgress(projects, projectPath, inProgress) {
  const projectIndex = projects.findIndex(project => project.projectPath === projectPath);

  if (projectIndex < 0) {
    return projects;
  }
  const project = projects[projectIndex];

  return [
    ...projects.slice(0, projectIndex),
    { ...project, inProgress },
    ...projects.slice(projectIndex + 1),
  ];
}

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
    case ADD_PROJECT:
      return {
        ...state,
        projects: [
          ...state.projects,
          { projectPath: action.projectPath, inProgress: action.inProgress },
        ],
      };
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
    case UPDATE_PROJECT_PROGRESS:
      return {
        ...state,
        projects: updateProjectProgress(state.projects, action.projectPath, action.inProgress),
      };
    default:
      return state;
  }
}
