import {
  SET_PROJECTS,
} from './constants';

import {
  SELECT_PROJECT,
} from '../Selection/constants';

const initialState = {
  projects: [],
};

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
    default:
      return state;
  }
}
