const { codeFrameColumns } = require('@babel/code-frame')
const { pass, fail, skip } = require('create-jest-runner-with-skip')

const { getStandardAdditionalConfig } = require('./helpers/getStandardAdditionalConfig')
const { fixPossibleErrors } = require('./helpers/fixPossibleErrors')
const { getLocalStandard } = require('./helpers/getLocalStandard')
const getFileContent = require('./helpers/getFileContent')
const { isPathIgnored } = require('./helpers/isPathIgnored')

module.exports = ({testPath, config: {rootDir = process.cwd(), fix = true}}) => {
  const standard = getLocalStandard(rootDir)

  const start = +new Date()
  const contents = getFileContent(testPath)
  const standardAdditionalConfig = getStandardAdditionalConfig(rootDir)

  const opts = {
    fileName: testPath,
    fix,
    ...standardAdditionalConfig,
    cwd: rootDir
  }

  if (isPathIgnored(opts, standard, testPath)) {
    return skip({ start, end: +new Date(), test: { path: testPath } })
  }

  const result = standard.lintTextSync(contents, opts)
  const end = +new Date()

  if (fix) {
    fixPossibleErrors(result, testPath, standard)
  }

  if (result.errorCount === 0) {
    return pass({ start, end, test: { path: testPath } })
  }

  let compiledErrorMessage = ''

  result.results[0].messages.forEach(({message, ruleId, line, column}) => {
    compiledErrorMessage += `${message} (${ruleId} at ${line}:${column})\n\n`
    const location = { start: { line, column } }
    compiledErrorMessage += `${codeFrameColumns(contents, location, {highlightCode: true})}\n`
  })

  return fail({
    start,
    end,
    test: { path: testPath, errorMessage: compiledErrorMessage, title: 'Standard error' }
  })
}
