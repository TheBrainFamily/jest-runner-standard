/* eslint-env jest */

// looks like quibble doesn't work with jest, as I explained here: https://github.com/testdouble/quibble/issues/23
// I will write those with pure jest mocks tomorrow, if time allows :-)

const td = require('testdouble')
// jest.mock('./helpers/getFileContent', () => ({ getFileContent: {} }))
// const { getFileContent } = td.replace('./helpers/getFileContent')
// const { getFileContent } = require('./helpers/getFileContent')
// console.log("Gandecki getFileContent", getFileContent);
test('it prints nicely formatted linting error', () => {
  const getFileContent = td.replace('./helpers/getFileContent')
  // const run = require('./run')
  // console.log("Gandecki getFileContent", getFileContent);
  td.when(getFileContent('somePath')).thenReturn('sdf')
  // run({testPath: 'somePath', config: {}})
})

test('just to show how it works with jest projects', () => {
  expect(4).toEqual(4)
})
