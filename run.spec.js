/* eslint-env jest */

const td = require('testdouble')
require('testdouble-jest')(td, jest)

const getContext = () => {
  const {getFileContent} = td.replace('./helpers/getFileContent')
  const {getLocalStandard} = td.replace('./helpers/getLocalStandard', {getLocalStandard: td.func()})
  const {getStandardAdditionalConfig} = td.replace('./helpers/getStandardAdditionalConfig', {getStandardAdditionalConfig: td.func()})
  const {isPathIgnored} = td.replace('./helpers/isPathIgnored', {isPathIgnored: td.func()})
  const {pass, fail, skip} = td.replace('create-jest-runner', {pass: td.func(), fail: td.func(), skip: td.func()})
  const run = require('./run')
  return {isPathIgnored, getLocalStandard, skip, pass, run, fail}
}

test('it marks test as skipped if file path is ignored', () => {
  const {isPathIgnored, skip, run} = getContext()
  const testPath = 'ignoredPath'
  td.when(isPathIgnored(td.matchers.anything(), td.matchers.anything(), testPath)).thenReturn(true)

  run({testPath, config: {}})

  td.verify(skip(td.matchers.contains({
    test: {path: testPath}
  })))

})

test('it marks test as passed if the errorCount equals 0', () => {
  const {getLocalStandard, pass, run} = getContext()
  const standardMock = {lintTextSync: td.func()}
  td.when(getLocalStandard(td.matchers.anything())).thenReturn(standardMock)
  td.when(standardMock.lintTextSync(td.matchers.anything(), td.matchers.anything())).thenReturn({errorCount: 0})

  const testPath = 'passingTest'
  run({testPath, config: {}})

  td.verify(pass(td.matchers.contains({test: {path: testPath}})))
})

test('it marks test as failed if the errorCount is greater than 0', () => {
  const {getLocalStandard, fail, run} = getContext()
  const standardMock = {lintTextSync: td.func()}
  td.when(getLocalStandard(td.matchers.anything())).thenReturn(standardMock)
  td.when(standardMock.lintTextSync(td.matchers.anything(), td.matchers.anything())).thenReturn({errorCount: 2, results: [{messages: []}]})

  const testPath = 'passingTest'
  run({testPath, config: {}})

  td.verify(fail(td.matchers.contains({test: {path: testPath, errorMessage: '', title: 'Standard error'}})))
})

// TODO try to generate the error message
// TODO test for fixing when STANDARD_AUTOFIX is set