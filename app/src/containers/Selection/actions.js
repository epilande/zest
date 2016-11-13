import { SELECT_PROJECT } from './constants';

export function selectProjectPath(path) {
  let projectPath = (typeof path === typeof {}) ? path.projectPath : path;
  return {
    type: SELECT_PROJECT,
    projectPath,
  };
}
