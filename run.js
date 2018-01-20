const fs = require('fs');
const { pass, fail, skip } = require('create-jest-runner-with-skip');
const path = require('path')

const getLocalStandard = require('./getLocalStandard')


module.exports = ({testPath, config: {rootDir = process.cwd(), fix = false}}) => {
  const standard = getLocalStandard(rootDir)

  const start = +new Date();
  const contents = fs.readFileSync(testPath, 'utf8');
  
  const standardAdditionalConfig = require(path.join(rootDir, 'package.json')).standard

  const opts = {
    fileName: testPath,
    fix,
    ...standardAdditionalConfig,
    cwd: rootDir,
  }

  const cliEngine = new standard.eslint.CLIEngine({...opts, ignorePattern: opts.ignore})

  if (cliEngine.isPathIgnored(testPath)) {
    return skip({ start, end: +new Date(), test: {path: testPath } })
  }

  const result = standard.lintTextSync(contents, opts)
  const end = +new Date();

  result.results[0].filePath = testPath

  if (fix) {
    try {
      standard.eslint.CLIEngine.outputFixes(result)
    } catch (e) {
      console.log("Error while outputting the fix", e);
    }
  }

  if (result.errorCount === 0) {
    return pass({ start, end, test: { path: testPath } });
  }


  let compiledErrorMessage = '';

  result.results[0].messages.forEach(({message, ruleId, line, column}) => {
    compiledErrorMessage += `${message} (${ruleId} at ${line}:${column})\n`
  })

  return fail({
    start,
    end,
    test: { path: testPath, errorMessage: compiledErrorMessage, title: 'Standard error' },
  });
};