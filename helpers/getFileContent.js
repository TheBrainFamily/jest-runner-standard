const fs = require('fs')
module.exports = (testPath) => fs.readFileSync(testPath, 'utf8')
