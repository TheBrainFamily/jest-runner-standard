const fs = require('fs');
const { pass, fail } = require('create-jest-runner');
const path = require('path')

const getLocalStandard = require('./getLocalStandard')


module.exports = ({testPath, config: {rootDir}}) => {
  const standard = getLocalStandard(rootDir)

  const start = +new Date();
  const contents = fs.readFileSync(testPath, 'utf8');
  
  const standardAdditionalConfig = require(path.join(rootDir, 'package.json')).standard

  const opts = {
    fileName: testPath,
    fix: true,
    ...standardAdditionalConfig,
    cwd: rootDir,
  }

  const result = standard.lintTextSync(contents, opts)
  const end = +new Date();

  result.results[0].filePath = testPath

  try {
    standard.eslint.CLIEngine.outputFixes(result)
  } catch(e) {
    console.log("Error while outputting the fix", e);
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