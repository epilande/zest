import Mocha from 'mocha';
import path from 'path';

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
  const filePaths = Mocha.utils.files(projectPath).map(resolvePath);
  const mocha = new Mocha();

  filePaths.forEach(function (filepath) {
    mocha.addFile(filepath)
  });

  const runner = mocha.run(function () {
    console.log(runner.testResults);
  });
}

function resolvePath (relativePath) {
  return path.resolve(relativePath);
}
