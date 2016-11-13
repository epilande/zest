import {
  SET_PROJECTS,
} from './constants';

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
    default:
      return state;
  }
}
