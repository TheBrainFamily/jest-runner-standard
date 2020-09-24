const path = require('path')
const findUp = require('find-up')

exports.getLocalStandard = rootDir => {
  const nodeModulesPath = findUp.sync(
    currentDir => findUp.sync(
      path.join('node_modules', 'standard'),
      { cwd: currentDir, type: 'directory' }
    ),
    { cwd: rootDir, type: 'directory' }
  )
  return require(nodeModulesPath)
}
