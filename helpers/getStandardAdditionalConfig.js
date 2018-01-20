const path = require('path')

exports.getStandardAdditionalConfig = (rootDir) => {
  return require(path.join(rootDir, 'package.json')).standard || {}
}
