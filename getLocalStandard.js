const path = require('path');
const findUp = require('find-up');

const getLocalStandard = rootDir => {
  const nodeModulesPath = findUp.sync('node_modules', { cwd: rootDir });
  return require(path.resolve(nodeModulesPath, 'standard'));
};

module.exports = getLocalStandard;
