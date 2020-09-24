/* eslint-env jest */

const path = require('path')
const {getLocalStandard} = require('./getLocalStandard.js')

test('it finds standardjs inside projects node_modules', () => {
  const target = require('./__tests__/fixtures/project-standard/node_modules/standard/index.js')
  const testDir = path.resolve('helpers', '__tests__', 'fixtures', 'project-standard')
  expect(getLocalStandard(testDir)).toBe(target)
})

test('it finds standardjs inside projects parent node_modules', () => {
  const target = require('./__tests__/fixtures/root-standard/node_modules/standard/index.js')
  const testDir = path.resolve('helpers', '__tests__', 'fixtures', 'root-standard', 'packages', 'project')
  expect(getLocalStandard(testDir)).toBe(target)
})
