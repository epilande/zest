import Mocha from 'mocha';
import path from 'path';

/**
 * Resolves the absolute file path.
 * @param  {String} relativePath  The file path to be resolved.
 * @return {String}               The absolute file path.
 */
function resolvePath(relativePath) {
  return path.resolve(relativePath);
}

/**
 * Runs mocha on a given path
 * @param  {String}   _projectPath  The path the mocha project
 * @param  {Function} callback      The callback handler
 */
export default function (_projectPath, callback) {
  let filePaths;
  try {
    filePaths = Mocha.utils
      .files(resolvePath(_projectPath))
      .map(resolvePath);
  } catch (err) {
    return callback(err);
  }
  const mocha = new Mocha();
  mocha.reporter('json');

  filePaths.forEach(filepath => mocha.addFile(filepath));

  const runner = mocha.run((err) => {
    if (err) {
      return callback(err);
    }
    return callback(null, runner.testResults);
  });
}
