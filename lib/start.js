const mocha = require('mocha');
const path = require('path');

exports.runMocha = runMocha;

/**
 * Runs mocha on a given path
 * @param  {[type]} path [description]
 * @return {[type]}      [description]
 */
function runMocha (_projectPath) {
  const projectPath = resolvePath(_projectPath);
  const options = {
    cwd: projectPath,
    env: 'test',
  };
  const filePaths = mocha.utils.files(projectPath).map(resolvePath);
}

function resolvePath (relativePath) {
  return path.resolve(relativePath);
}
