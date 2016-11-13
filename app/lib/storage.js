import storage from 'electron-json-storage';

/**
 * Gets a value from app storage.
 * @param  {String}   key      The key to store the data under.
 * @param  {Function} callback The callback function after data is retrieved.
 */
export function get(key, callback) {
  return storage.get(key, (err, value) => {
    if (err) {
      return callback(err);
    }
    // For some reason `storage.get` returns an empty object if the value is not defined.
    if (JSON.stringify(value) === JSON.stringify({})) {
      return callback(null, undefined);
    }
    return callback(null, value);
  });
}

/**
 * Stores a key value in app storage.
 * @param  {String}   key      The key to store the data under.
 * @param  {String}   value    The value to store.
 * @param  {Function} callback The callback function after data is stored.
 */
export function set(key, value, callback) {
  return storage.set(key, value, (err) => {
    if (err) {
      return callback(err);
    }
    return callback(null, value);
  });
}

const PROJECTS_KEY = 'projects';

/**
 * Finds or creates an array to store projects
 * @return {[Object]} The array of projects.
 */
export function getProjects(callback) {
  return get(PROJECTS_KEY, (err, projects) => {
    if (err) {
      return callback(err);
    }
    if (!projects) {
      const newProjects = [];
      return set(PROJECTS_KEY, newProjects, (initErr) => {
        if (initErr) {
          return callback(err);
        }
        return callback(null, newProjects);
      });
    }
    return callback(null, projects);
  });
}

export function updateProject(projectPath, data, callback) {
  return getProjects((err, projects) => {
    if (err) {
      return callback(err);
    }

    const upsertProject = {
      ...data,
      projectPath,
    };
    const projectIndex = projects.findIndex(project => project.projectPath === projectPath);

    let updatedProjects;
    if (projectIndex < 0) {
      updatedProjects = [...projects, upsertProject];
    } else {
      updatedProjects = [
        ...projects.slice(0, projectIndex),
        upsertProject,
        ...projects.slice(projectIndex + 1),
      ];
    }

    return set(PROJECTS_KEY, updatedProjects, callback);
  });
}
