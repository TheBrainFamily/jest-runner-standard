exports.fixPossibleErrors = function (result, testPath, standard) {
  const newResult = {...result, results: [{...result.results[0], filePath: testPath}]}
  try {
    standard.eslint.CLIEngine.outputFixes(newResult)
  } catch (e) {
    console.log('Error while outputting the fix', e)
  }
}
