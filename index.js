// index.js
const { createJestRunner } = require('create-jest-runner-with-skip')
module.exports = createJestRunner(require.resolve('./run'))
